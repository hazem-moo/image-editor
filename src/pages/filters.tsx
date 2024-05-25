import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const Filters = () => {
  const [saturate, setSaturate] = useState<number | string>(100);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [blur, setBlur] = useState(0);

  let aside = useRef("") as HTMLDivElement | any;

  useEffect(() => {
    aside.current.style.display = "none";
  }, []);

  let resetValue = () => {
    let img = document.getElementById("img") as HTMLImageElement;
    img.style.filter = "none";
    setSaturate(100);
    setContrast(100);
    setBrightness(100);
    setBlur(0);
    setSepia(0);
    setGrayscale(0);
  };

  if (typeof window !== "undefined") {
    let filters = document.querySelectorAll(".filters input");
    filters.forEach((el) => {
      let img = document.getElementById("img") as HTMLImageElement;
      let canvas = document.getElementById("canvas") as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as any;
      el.addEventListener("input", () => {
        ctx.filter = `
          saturate(${saturate}%) 
          contrast(${contrast}%) 
          brightness(${brightness}%)
          sepia(${sepia}%)
          grayscale(${grayscale})
          blur(${blur}px)
          `;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
    });
  }

  let donwloaded = () => {
    let download = document.getElementById("download") as HTMLAnchorElement;
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    download.href = canvas.toDataURL();
  };

  return (
    <form className="filters">
      <div>
        <label htmlFor="satulate">satulate</label>
        <input
          type="range"
          className="inp"
          max={200}
          min={0}
          value={saturate}
          id="inp satulate"
          step={10}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSaturate(e.target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="contrast">contrast</label>
        <input
          onChange={(e: any) => setContrast(e.target.value)}
          type="range"
          className="inp"
          max={200}
          min={0}
          value={contrast}
          id="inp contrast"
          step={10}
        />
      </div>
      <div>
        <label htmlFor="brightness">brightness</label>
        <input
          type="range"
          className="inp"
          max={200}
          min={0}
          value={brightness}
          id="inp brightness"
          step={10}
          onChange={(e: any) => setBrightness(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sepia">sepia</label>
        <input
          type="range"
          className="inp"
          max={200}
          min={0}
          value={sepia}
          id="sepia"
          step={10}
          onChange={(e: any) => setSepia(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="grayscale">grayscale</label>
        <input
          type="range"
          className="inp"
          max={1}
          min={0}
          value={grayscale}
          id="inp grayscale"
          step={0.1}
          onChange={(e: any) => setGrayscale(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="blur">blur</label>
        <input
          type="range"
          className="inp"
          max={10}
          min={0}
          value={blur}
          id="inp blur"
          step={0.1}
          onChange={(e: any) => setBlur(e.target.value)}
        />
        <aside className="aside" ref={aside}>
          <a download="img" id="download" href="" onClick={donwloaded}>
            download
          </a>
          <input type="reset" id="reset" onClick={resetValue} value="reset" />
        </aside>
      </div>
    </form>
  );
};

export default Filters;
