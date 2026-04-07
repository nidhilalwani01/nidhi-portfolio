const yearElement = document.getElementById("year");
if (yearElement) {
	yearElement.textContent = `${new Date().getFullYear()}`;
}

// Show optional buttons only when a URL is provided.
const optionalLinks = document.querySelectorAll("[data-url]");
for (let i = 0; i < optionalLinks.length; i += 1) {
	const link = optionalLinks[i];
	const url = link.dataset.url;
	if (url && url.trim() !== "") {
		link.href = url;
		link.target = "_blank";
		link.rel = "noreferrer";
		link.hidden = false;
	}
}

// Hide optional video sections unless a real video URL is provided.
const videoSections = document.querySelectorAll("[data-video-section]");
for (let i = 0; i < videoSections.length; i += 1) {
	const section = videoSections[i];
	const iframe = section.querySelector("iframe[data-video-url]");
	if (!iframe) {
		continue;
	}

	const videoUrl = iframe.dataset.videoUrl;
	if (videoUrl && videoUrl.trim() !== "") {
		iframe.src = videoUrl;
		section.hidden = false;
	} else {
		section.hidden = true;
	}
}
