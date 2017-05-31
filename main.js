let menu = document.getElementById("menu");
let menuExpand = document.getElementById("menu-expand");
menuExpand.addEventListener("click", () => {
	menu.classList.toggle("slide-out");
});
