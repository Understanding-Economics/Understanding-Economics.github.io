var curTab = null;

window.onload = () => {
    curTab = document.getElementById("navbar").getElementsByTagName("li")[0].id.substring(3);
    frame = document.getElementById("frame_dataview");
}
function onTabClick(selectedSurvey) {
    document.getElementById(`link_${selectedSurvey}`).classList.add("active");
    document.getElementById(`link_${curTab}`).classList.remove("active");
    curTab = selectedSurvey;
    document.getElementById("frame_dataview").src = `./dataview?page=${curTab}`;
}