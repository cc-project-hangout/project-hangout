import logo_name from "./logo_name_white.png";

export default {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      speed: 1,
      out_mode: "out",
    },
    shape: {
      type: ["images", "circle"],
      images: [
        {
          src: logo_name,
          height: 40,
          width: 55,
        },
      ],
    },
    color: {
      value: "#FFF",
    },
    size: {
      value: 30,
      random: false,
      anim: {
        enable: true,
        speed: 4,
        size_min: 10,
        sync: false,
      },
    },
  },
  retina_detect: false,
};
