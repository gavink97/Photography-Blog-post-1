import EmblaCarousel from "embla-carousel";
import { setupPrevNextBtns, disablePrevNextBtns } from "./prevAndNextButtons";
import { parallax } from "./parallax";
import "./reset.css";
import "./embla.css";

const wrap = document.querySelector(".embla");
const viewPort = wrap.querySelector(".embla__viewport");
const prevBtn = wrap.querySelector(".embla__button--prev");
const nextBtn = wrap.querySelector(".embla__button--next");
const embla = EmblaCarousel(viewPort, {loop: true });
const startIndex = EmblaCarousel(1);

const applyParallaxStyles = parallax(embla);
embla.on("init", applyParallaxStyles);
embla.on("scroll", applyParallaxStyles);
embla.on("resize", applyParallaxStyles);

const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);
setupPrevNextBtns(prevBtn, nextBtn, embla);
embla.on("init", disablePrevAndNextBtns);
embla.on("select", disablePrevAndNextBtns);
