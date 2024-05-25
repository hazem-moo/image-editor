"use client";
import Image from "next/image";
import React, {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";

const ImgContainer = () => {
  let [img, setImg] = useState<string | any>("");
  let imgREf = useRef("") as HTMLImageElement | any;

  useEffect(() => {
    let imgContent = document.querySelector(".img-content") as HTMLDivElement;
    imgContent.style.display = "none";
  }, []);

  let addImg = () => {
    let imgContent = document.querySelector(".img-content") as HTMLDivElement;
    let aside = document.querySelector(".aside") as HTMLDivElement;
    aside.style.display = "block";
    imgContent.style.display = "block";
    let upload = document.getElementById("upload") as HTMLAnchorElement | any;

    let filters = document.querySelectorAll(".filters input");
    filters.forEach((ele: any) => {
      if (
        ele.id.includes("saturate") ||
        ele.id.includes("contrast") ||
        ele.id.includes("brightness")
      ) {
        ele.value = 100;
      } else if (
        ele.id.includes("blur") ||
        ele.id.includes("sepia") ||
        ele.id.includes("grayscale")
      ) {
        ele.value = 0;
      }
    });

    let file = new FileReader();
    file.readAsDataURL(upload?.files[0]);
    file.onload = () => {
      setImg(file.result);
      imgREf.current.style = "";
    };

    let img = document.getElementById("img") as HTMLImageElement;
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx: any = canvas.getContext("2d");
    img.onload = () => {
      canvas.width = img?.clientWidth;
      canvas.height = img?.clientHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.style.display = "none";
    };
  };

  return (
    <div className="img-container">
      <div className="img-content">
        <Image
          alt="add img "
          src={img}
          width={300}
          height={500}
          id="img"
          className="img"
          ref={imgREf}
        />
        <canvas id="canvas" />
      </div>
      <form>
        <label htmlFor="upload">upload</label>
        <input type="file" id="upload" onChange={addImg} />
      </form>
    </div>
  );
};

export default ImgContainer;
