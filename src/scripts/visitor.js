import { setCookie, getCookie } from './cookie';

export function isFirstVisit() {
	var visited = getCookie("visited");
	if (visited === "yes") {
		return false; // Not first visit
	} else {
		setCookie("visited", "yes", 365); // Expire in 1 year
		return true; // First visit
	}
}
