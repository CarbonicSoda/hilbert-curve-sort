import { h2CurveSort, h3CurveSort, VEC2, VEC3 } from "./maths/hilbert-curve-sort.js";

const rand = (a: number, b: number) => Math.random() * (b - a) + a;

const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;

// 2D Points Section
const pts2dCvs = <HTMLCanvasElement>document.querySelector("#pts2d-demo canvas");
const pts2dTextArea = <HTMLTextAreaElement>document.querySelector("#pts2d-actions textarea");
const pts2dSet = <HTMLButtonElement>document.querySelector("#pts2d-set");
const pts2dRdmN = <HTMLInputElement>document.querySelector("#pts2d-actions input");
const pts2dRdm = <HTMLButtonElement>document.querySelector("#pts2d-random");

const pts2dCtx = <CanvasRenderingContext2D>pts2dCvs.getContext("2d");
const pts2dSide = pageWidth * 0.45;
pts2dCvs.setAttribute("width", String(pts2dSide));
pts2dCvs.setAttribute("height", String(pts2dSide));

async function draw2dPts(pts: VEC2[]): Promise<void> {
	pts2dCtx.clearRect(0, 0, pts2dSide, pts2dSide);

	const sorted = await h2CurveSort(pts);
	pts2dCtx.beginPath();
	for (let [x, y] of sorted) {
		y = pts2dSide - y;
		if (sorted.length <= 500) pts2dCtx.fillRect(x - 4, y - 4, 8, 8);
		pts2dCtx.lineTo(x, y);
	}
	pts2dCtx.stroke();
}

function drawSetPts(ptsInput?: string): void {
	const pts = (ptsInput ?? pts2dTextArea.value)
		.trim()
		.split("\n")
		.map((coords) => coords.split(" ").map(Number))
		.filter((vec) => vec.length === 2 && vec.every(Number.isFinite));
	if (pts.length < 2) {
		drawSetPts(<string>pts2dTextArea.getAttribute("placeholder"));
		return;
	}
	let [minX, minY] = pts[0];
	let [maxX, maxY] = pts[0];
	for (const [x, y] of pts) {
		if (x < minX) minX = x;
		else if (x > maxX) maxX = x;
		if (y < minY) minY = y;
		else if (y > maxY) maxY = y;
	}
	let scaleX = (pts2dSide - 40) / (maxX - minX);
	let scaleY = (pts2dSide - 40) / (maxY - minY);
	if (scaleX === 0 || !Number.isFinite(scaleX)) scaleX = 1;
	if (scaleY === 0 || !Number.isFinite(scaleY)) scaleY = 1;
	draw2dPts(pts.map(([x, y]) => [scaleX * (x - minX) + 20, scaleY * (y - minY) + 20]));
}
pts2dSet.addEventListener("click", () => drawSetPts());
pts2dRdm.addEventListener("click", () => {
	let n = Number(pts2dRdmN.value);
	if (!n) n = 100;
	const pts = <VEC2[]>[...Array(n)].map(() => [rand(0, pts2dSide), rand(0, pts2dSide)]);
	draw2dPts(pts);
});

pts2dTextArea.setAttribute("placeholder", "0 0\n0 1\n1 0\n1 1");
drawSetPts();

// Colors (sRGB) Section
const clrsOriginalCvs = <HTMLCanvasElement>document.querySelector("#colors-original");
const clrsSortedCvs = <HTMLCanvasElement>document.querySelector("#colors-sorted");
const clrsTextArea = <HTMLTextAreaElement>document.querySelector("#colors-actions textarea");
const clrsSet = <HTMLButtonElement>document.querySelector("#colors-set");
const clrsRdmN = <HTMLInputElement>document.querySelector("#colors-actions input");
const clrsRdm = <HTMLButtonElement>document.querySelector("#colors-random");

const clrsOriginalCtx = <CanvasRenderingContext2D>clrsOriginalCvs.getContext("2d");
const clrsSortedCtx = <CanvasRenderingContext2D>clrsSortedCvs.getContext("2d");
const clrsCvsWidth = pageWidth * 0.9;
const clrsCvsHeight = pageHeight * 0.1;
clrsOriginalCvs.setAttribute("width", String(clrsCvsWidth));
clrsOriginalCvs.setAttribute("height", String(clrsCvsHeight));
clrsSortedCvs.setAttribute("width", String(clrsCvsWidth));
clrsSortedCvs.setAttribute("height", String(clrsCvsHeight));

async function drawClrs(clrs: VEC3[]): Promise<void> {
	clrsOriginalCtx.clearRect(0, 0, clrsCvsWidth, clrsCvsHeight);
	clrsSortedCtx.clearRect(0, 0, clrsCvsWidth, clrsCvsHeight);
	const clrWidth = clrsCvsWidth / clrs.length;

	for (let i = 0; i < clrs.length; i++) {
		const [r, g, b] = clrs[i];
		clrsOriginalCtx.fillStyle = `rgb(${r} ${g} ${b})`;
		clrsOriginalCtx.fillRect(i * clrWidth, 0, clrWidth + 1, clrsCvsHeight);
	}

	const sorted = await h3CurveSort(clrs);
	for (let i = 0; i < sorted.length; i++) {
		const [r, g, b] = sorted[i];
		clrsSortedCtx.fillStyle = `rgb(${r} ${g} ${b})`;
		clrsSortedCtx.fillRect(i * clrWidth, 0, clrWidth + 1, clrsCvsHeight);
	}
}

function drawSetClrs(clrsInput?: string): void {
	const clrs = <VEC3[]>(clrsInput ?? clrsTextArea.value)
		.trim()
		.split("\n")
		.map((value) => value.split(" ").map(Number))
		.filter((rgb) => rgb.length === 3 && rgb.every(Number.isFinite));
	if (clrs.length < 2) {
		drawSetClrs(<string>clrsTextArea.getAttribute("placeholder"));
		return;
	}
	drawClrs(clrs);
}
clrsSet.addEventListener("click", () => drawSetClrs());

function rdmClrs(n: number): VEC3[] {
	return [...Array(n)].map(() => [rand(0, 255), rand(0, 255), rand(0, 255)]);
}
clrsRdm.addEventListener("click", () => {
	let n = Number(clrsRdmN.value);
	if (!n) n = 100;
	drawClrs(rdmClrs(n));
});

const step = 50;
const bits = [...Array(Math.trunc(255 / step) + 1).keys()].map((b) => step * b);
const rgbUniform = bits.flatMap((r) => bits.flatMap((g) => bits.map((b) => [r, g, b])));
clrsTextArea.setAttribute("placeholder", rgbUniform.map((rgb) => rgb.join(" ")).join("\n"));
drawSetClrs();
