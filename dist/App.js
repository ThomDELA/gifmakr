import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import {createFFmpeg, fetchFile} from "../_snowpack/pkg/@ffmpeg/ffmpeg.js";
const ffmpeg = createFFmpeg({log: true});
function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };
  useEffect(() => {
    load();
  }, []);
  const convertToGif = async () => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));
    await ffmpeg.run("-i", "test.mp4", "-t", "2.5", "-ss", "2.0", "-f", "gif", "out.gif");
    const data = ffmpeg.FS("readFile", "out.gif");
    const url = URL.createObjectURL(new Blob([data.buffer], {type: "image/gif"}));
    setGif(url);
  };
  return ready ? /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, video && /* @__PURE__ */ React.createElement("video", {
    controls: true,
    width: "250",
    src: URL.createObjectURL(video)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    onChange: (e) => setVideo(e.target.files?.item(0))
  }), /* @__PURE__ */ React.createElement("h3", null, "Result"), /* @__PURE__ */ React.createElement("button", {
    onClick: convertToGif
  }, "Convert"), gif && /* @__PURE__ */ React.createElement("img", {
    src: gif,
    width: "250"
  })) : /* @__PURE__ */ React.createElement("p", null, "Loading...");
}
export default App;
