// 데이터를 수신해서 HTML에 내용 쓰기 
// 
export class DocWriter {
	writeText(id, desc) {
		let tag = document.getElementById(id); 
		
		if(tag === undefined || tag === null) {
			console.log(`id=${id}, desc=${desc}`); 
		} 
		else {
			tag.innerText = desc; 
		} 
	} 
	
	writeImage(id, addr) {
		let tag = document.getElementById(id); 
		
		if(tag === undefined || tag === null) {
			console.log(`id=${id}, desc=${desc}`); 
		} 
		else {
			let node = document.createElement("img"); 
			node.setAttribute("src", addr); 
			//node.setAttribute("width", "30%"); 
			tag.append(node); 
		} 	
	} 

	writeItem(id, itemId, title, summary, pubDate, guid) {
		let parentNode = document.getElementById(id); 
		
		if(parentNode === undefined || parentNode === null) {
			console.log(`id=${id}, desc=${desc}`); 
		} 
		else {
			let itemNode = document.createElement("div"); 
			itemNode.setAttribute("id", "item_" + itemId); 
			
			// 홀수 
			if (itemId & 1) {
				itemNode.setAttribute("class", "oddItem"); 
			} 
			// 짝수 
			else {
				itemNode.setAttribute("class", "evenItem"); 
			} 
			
			// 새로 만든 노드 추가 
			parentNode.appendChild(itemNode); 
			
			// 제목 
			let titleNode = document.createElement("div"); 
			titleNode.setAttribute("id", "title"); 
			titleNode.innerHTML = title; 
			itemNode.appendChild(titleNode); 
			
			// 발행일 
			let pubNode = document.createElement("div"); 
			pubNode.setAttribute("id", "pubDate"); 
			pubNode.innerText = "(" + this.convertDate(pubDate) + ")"; 
			itemNode.appendChild(pubNode); 
			
			// 요약 
			let descNode = document.createElement("div"); 
			descNode.setAttribute("id", "summary");
			descNode.innerText = summary; 
			itemNode.appendChild(descNode); 
			
			// 재생링크 껍데기 
			let playOutNode = document.createElement("div"); 
			playOutNode.setAttribute("id", "playOut"); 
			itemNode.append(playOutNode); 
			
			// 재생링크 
			let playNode = document.createElement("a"); 
			playNode.setAttribute("id", "play"); 
			playNode.setAttribute("href", guid); 
			playNode.setAttribute("target", "_blank"); 
			playNode.innerText = "듣기"; 
			playOutNode.appendChild(playNode); 
		} 
	} 


	convertDate(value) {
		if(value === null || value === undefined) {
			return ""; 
		} 
		
		let date = new Date(Date.parse(value)); 
		let dateStr = ""; 
		
		// 문자열로 만들어 붙이기 
		dateStr += date.getFullYear() + "-";  
		dateStr += (date.getMonth() + 1) + "-"; 
		dateStr += date.getDate(); 
		
		
		return dateStr; 	
	} 

} 

