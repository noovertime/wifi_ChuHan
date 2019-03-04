// 데이터 파일의 내용 읽어서 분석 
// 
export class Loader {
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

