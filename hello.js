class Loader {
	constructor(dataUrl) {
		console.log("constructor"); 
		this.dataUrl = dataUrl; 
  	}

	load() {
		// Promise, https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
		var data = fetch("./data.xml"); 

		// 파일 읽기시작 
		data.then(this.handleFetchSuccess).catch(
			function(err) {
				console.error(err); 
  			}
  		); 
	}  
  
  	// 읽은 내용 처리하기 
	handleFetchSuccess(resolvedData) {
		// ReadableStream 
		let reader = resolvedData.body.getReader(); 
		var readString = ""; 
		
		reader.read()
		// 읽기 
		.then(function processText({done, value}) {
			if(done) {
				// done일 때 value는 undefined 
				console.log("다 읽었음"); 
				return; 
			} 
			
			// value는 Uint8Array 타입 
			// 끝이 아니면 더하고 
			readString += new TextDecoder("utf-8").decode(value); 
			
			// 남은거 계속 읽기 
			return reader.read().then(processText); 
		})
		// 다 읽은 내용 파싱 
		.then(function() {
			//console.log(toString.call(readString)); 
			
			let parser = new DOMParser(); 
			// string 을 파싱함 
			let xmlDoc = parser.parseFromString(readString, "text/xml"); 
			// 루트 노드에 접근 (HTMLCollection 객체) 
			let rootNode = xmlDoc.getElementsByTagName("rss"); 
			// 실제 루트노드 (Element 객체) 
			let rssNode = rootNode.item(0); 
			// channel 엘리먼트
			let channelNode = rssNode.children; 
			// channel 하위 엘리먼트 들 
			let targetNode = channelNode[0].children; 
			
			let writer = new DocWriter();
			let itemCount = 1; 
			
			// 하나씩 처리 
			for(let node of targetNode) {
				// 프로그램 제목 
				if (node.tagName == "title") {
					writer.writeText("titleDiv", node.textContent); 
				} 
				// 프로그램 설명 
				else if(node.tagName == "description") { 
					writer.writeText("descDiv", node.textContent); 
				} 
				// 이미지 imageDiv
				else if(node.tagName == "itunes:image") { 
					let address = node.getAttribute("href"); 
					writer.writeImage("imageDiv", address); 
				} 
				// 아이템들 
				else if(node.tagName == "item") { 
					let title = node.getElementsByTagName("title")[0].textContent; 
					let summary = node.getElementsByTagName("itunes:summary")[0].textContent; 
					let pubDate = node.getElementsByTagName("pubDate")[0].textContent; 
					let guid = node.getElementsByTagName("guid")[0].textContent; 
					
					writer.writeItem("itemListDiv", itemCount, title, summary, pubDate, guid); 
					itemCount += 1; 
				} 
			
			} 
		}); 
	} 
}

class DocWriter {
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


class EleInfo {
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



// function handleFetchSuccess(res) {
// 	console.log("handleFetchSuccess, res=" + toString.call(res)); 
// 
// } 

//const dataUrl = "http://enabler.kbs.co.kr/api/podcast_channel/feed.xml?channel_id=R2016-0125"; 

let test = new Loader(); 
test.load(); 
