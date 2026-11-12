// ---------- Dữ liệu: muốn thêm hay sửa câu chuyện, chỉ cần sửa ở đây ----------
const STORIES = [
  {
    id: "nha",
    title: "Ngôi nhà sàn",
    where: "Trong vườn Phủ Chủ tịch, Hà Nội",
    text: "Năm 1958, Bác đề nghị dựng một ngôi nhà sàn nhỏ bên ao cá, giống những nếp nhà sàn ở Việt Bắc thời kháng chiến. Kiến trúc sư Nguyễn Văn Ninh vẽ thiết kế. Bác dặn chỉ dùng gỗ bình thường, để dành gỗ tốt cho những việc cần hơn. Bác sống và làm việc ở đây từ năm 1958 đến năm 1969.",
    lesson: "Người đứng đầu đất nước chọn chỗ ở vừa đủ dùng, không hơn."
  },
  {
    id: "maychu",
    title: "Máy chữ Hermes Baby",
    where: "Phòng làm việc ở tầng trên",
    text: "Chiếc máy chữ xách tay nhỏ gọn là đồ dùng quen thuộc của Bác. Bác tự đánh máy nhiều bài báo, thư từ và văn kiện chứ không giao hết cho thư ký.",
    lesson: "Việc gì tự làm được thì tự làm."
  },
  {
    id: "dichuc",
    title: "Bản Di chúc",
    where: "Viết tại phòng làm việc ở tầng trên",
    text: "Ngày 10/5/1965, Bác bắt đầu viết tài liệu mà Người ghi là “Tuyệt đối bí mật”. Mỗi năm vào dịp sinh nhật, Bác đọc lại, sửa và viết thêm, cho đến tháng 5 năm 1969. Bản Di chúc dặn dò về Đảng, về nhân dân, về thanh niên và nói lên mong muốn về một nước Việt Nam hòa bình, thống nhất.",
    lesson: "Đến những năm cuối đời, điều Bác nghĩ tới vẫn là đất nước và nhân dân."
  },
  {
    id: "ban",
    title: "Bàn làm việc tầng dưới",
    where: "Tầng dưới để trống, lộng gió",
    text: "Tầng dưới không có tường, chỉ kê một bộ bàn ghế. Đây là nơi Bác làm việc vào mùa hè, tiếp khách và họp với Bộ Chính trị. Thiếu nhi vào thăm Bác cũng quây quần ở đây.",
    lesson: "Nơi làm việc mở ra với thiên nhiên và với mọi người."
  },
  {
    id: "dongho",
    title: "Chiếc đồng hồ để bàn",
    where: "Trên bàn ở tầng dưới",
    text: "Chiếc đồng hồ nhỏ vỏ sắt mạ vàng được mua năm 1964 ở một cửa hàng bên Bờ Hồ. Bác rất quý thời gian: luôn đúng giờ và không muốn ai phải chờ mình.",
    lesson: "Quý thời gian của mình cũng là tôn trọng thời gian của người khác."
  },
  {
    id: "dep",
    title: "Đôi dép cao su",
    where: "Dưới chân cầu thang",
    text: "Đôi dép được cắt từ một chiếc lốp ô tô ở Việt Bắc năm 1947. Bác đi đôi dép ấy khoảng hai mươi năm, kể cả khi tiếp khách và đi thăm nước ngoài. Mỗi lần có người xin đổi đôi mới, Bác đều bảo dép còn đi được.",
    lesson: "Giản dị và tiết kiệm khi nhân dân còn khó khăn."
  },
  {
    id: "ao",
    title: "Ao cá",
    where: "Ngay trước nhà sàn",
    text: "Sau giờ làm việc, Bác thường ra ao cho cá ăn. Bác vỗ tay gọi, đàn cá quen tiếng liền bơi lại. Cá lớn được chia cho anh em phục vụ để cải thiện bữa ăn.",
    lesson: "Lao động và chăm sóc thiên nhiên là một phần của cuộc sống hằng ngày."
  },
  {
    id: "vusua",
    title: "Cây vú sữa miền Nam",
    where: "Bên cạnh nhà sàn",
    text: "Năm 1954, đồng bào miền Nam gửi ra tặng Bác một cây vú sữa. Bác tự tay chăm sóc cây, và khi chuyển sang ở nhà sàn, cây cũng được đưa về trồng gần bên.",
    lesson: "Tình cảm của Bác với miền Nam khi đất nước còn chia cắt."
  }
];

// ---------- Trạng thái ----------
const seen = new Set();
let current = null;

const storyBox = document.getElementById("story");
const chipsBox = document.getElementById("chips");
const countText = document.getElementById("count");
const bar = document.getElementById("bar");
const spots = document.querySelectorAll(".spot");

// Tạo danh sách nút bên dưới bức vẽ
STORIES.forEach(function (s) {
  const li = document.createElement("li");
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip";
  b.dataset.id = s.id;
  b.textContent = s.title;
  b.addEventListener("click", function () { open(s.id, false); });
  li.appendChild(b);
  chipsBox.appendChild(li);
});

// Gắn sự kiện cho các chấm trên bức vẽ
spots.forEach(function (g) {
  g.addEventListener("click", function () { open(g.dataset.id, true); });
  g.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open(g.dataset.id, true);
    }
  });
});

function open(id, scroll) {
  const s = STORIES.find(function (x) { return x.id === id; });
  if (!s) return;
  current = id;
  seen.add(id);

  storyBox.textContent = "";
  const h = document.createElement("h2");
  h.textContent = s.title;
  const w = document.createElement("p");
  w.className = "where";
  w.textContent = s.where;
  const t = document.createElement("p");
  t.textContent = s.text;
  const l = document.createElement("p");
  l.className = "lesson";
  l.textContent = "Điều rút ra: " + s.lesson;
  storyBox.append(h, w, t, l);

  if (seen.size < STORIES.length) {
    const n = document.createElement("button");
    n.type = "button";
    n.className = "next";
    n.textContent = "Mở câu chuyện tiếp theo";
    n.addEventListener("click", function () {
      const next = STORIES.find(function (x) { return !seen.has(x.id); });
      if (next) open(next.id, false);
    });
    storyBox.appendChild(n);
  } else {
    const done = document.createElement("p");
    done.className = "lesson";
    done.textContent = "Bạn đã mở đủ tám câu chuyện. Điểm chung của chúng: một cuộc sống giản dị, gần thiên nhiên và luôn nghĩ đến nhân dân.";
    storyBox.appendChild(done);
  }

  refresh();
  if (scroll) storyBox.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function refresh() {
  spots.forEach(function (g) {
    g.classList.toggle("seen", seen.has(g.dataset.id));
    g.classList.toggle("active", g.dataset.id === current);
  });
  chipsBox.querySelectorAll(".chip").forEach(function (b) {
    b.classList.toggle("seen", seen.has(b.dataset.id));
    b.classList.toggle("active", b.dataset.id === current);
  });
  countText.textContent = "Đã mở " + seen.size + "/" + STORIES.length + " câu chuyện";
  bar.style.width = (seen.size / STORIES.length * 100) + "%";
}
