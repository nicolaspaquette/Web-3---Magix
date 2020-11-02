const applyStyles = iframe => {
	let styles = {
		fontColor : "#000000",
		backgroundColor : "rgba(255, 255, 255, 0.5)",
		fontGoogleName : "MedievalSharp",
		fontSize : "20px",
	}
	
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}
