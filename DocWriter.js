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
			node.setAttribute("width", "30%"); 
			tag.append(node); 
		} 	
	} 

	writeItem(id, itemId, title, summary, pubDate, guid) {
		let tag = document.getElementById(id); 
		
		if(tag === undefined || tag === null) {
			console.log(`id=${id}, desc=${desc}`); 
		} 
		else {
			// 템플릿 찾고 
			let template = document.getElementById("itemTemplate"); 
			// 확인 
			if (template === undefined || template === null) {
				console.log(`추가못함 : title=${title}`); 
			} 
			else {
				// 하위노드 포함해서 복사 
				let node = template.cloneNode(true); 
				// id 지정 
				node.setAttribute("id", "item_" + itemId); 
				
				// 하위 노드에 값 꽂기 
				for(let child of node.children) { 
					let currentId = child.getAttribute("id"); 
					
					switch(currentId) {
						case "title" : 
							// 제목 
							let titleNode = child.children[0]; 
							titleNode.innerHTML = title; 
							
							// 날짜 
							let dateNode = child.children[1]; 
							let date = new Date(Date.parse(pubDate)); 
							let dateStr = ""; 
							// 문자열로 만들어 붙이기 
							dateStr += date.getFullYear() + "-";  
							dateStr += (date.getMonth() + 1) + "-"; 
							dateStr += date.getDate(); 
							dateNode.innerText = "  (" + dateStr + ")"; 
							break; 
							
						case "play" : 
							child.setAttribute("href", guid); 
							break; 
							
						case "summary" : 
							child.innerText = summary; 
							break; 
					} 
				} 
				
				// 추가 
				tag.append(node); 
			} 
		} 
	} 
} 

