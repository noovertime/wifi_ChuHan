export class DebugUtil {
	// element 정보 찍어보기 
	info(element) {
		if (element === null) {
			return "null"; 
		} 
		if (element === undefined) {
			return "undefined"; 
		} 
		
		
		var eleInfo = ""; 
		
		eleInfo += "type=" + toString.call(element); 
		
		
		if (element instanceof HTMLCollection) { 
			eleInfo += ", length=" + element.length; 
		} 
		else if(element instanceof HTMLDivElement) {
			eleInfo += ", tagName=" + element.tagName; 
			eleInfo += ", childElementCount=" + element.childElementCount; 
			eleInfo += ", hasChildNodes=" + element.hasChildNodes(); 
		} 
		else if(element instanceof Element) {
			eleInfo += ", tagName=" + element.tagName; 
			
			if (element.children.length !== 0) {
				eleInfo += ", children=" + toString.call(element.children); 
				eleInfo += "(" + element.children.length + ")"; 
			} 
			
			eleInfo += ", innerText=" + element.innerText; 
			eleInfo += ", innerHTML=" + element.innerHTML; 
			eleInfo += ", textContent=" + element.textContent; 
		}
 
		else {
			
		} 
		
		
		return eleInfo; 
	} 
} 
