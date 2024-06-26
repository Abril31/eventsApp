import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dcvxjhqk8",
    api_key: '521923274491417', 
    api_secret: 'RqUuw470QhKw4mzq0t_pyTRRcWg'
  },
});

//Imágenes del Carrusel
const losOtros = cld.image("event_images/otros2_ewwass");
const otros = cld.image("event_images/otros_fmwqif");
const seminario = cld.image("event_images/seminarios_mmabb9");
const literatura = cld.image("event_images/literatura_a8km2e");
const theater = cld.image("event_images/teatro_wsub7q");
const concert = cld.image("event_images/concerts_g1z6wn");
const sports = cld.image("event_images/deportes_y8ycgy");
const arts = cld.image("event_images/arteCrea_qief1o");

export const imgOne = losOtros.resize(fill().width(1920).height(700));
export const imgTwo = otros.resize(fill().width(1920).height(700));
export const imgThree = seminario.resize(fill().width(1920).height(700));
export const imgFour = literatura.resize(fill().width(1920).height(700));
export const imgFive = theater.resize(fill().width(1920).height(700));
export const imgSix = concert.resize(fill().width(1920).height(700));
export const imgSeven = sports.resize(fill().width(1920).height(700));
export const imgEight = arts.resize(fill().width(1920).height(700));

//Imágenes Categorías

const art = cld.image("event_images/cultural_p8i89s");
export const artImg = art
  .resize(fill().width(150).height(150).gravity(focusOn(face())))
  .roundCorners(max());
const sport = cld.image("event_images/basket_tmeilr");
export const sportImg = sport
  .resize(fill().width(150).height(150).gravity(focusOn(face())))
  .roundCorners(max());
const music = cld.image("event_images/music_a095tw");
export const musicImg = music
  .resize(fill().width(150).height(150).gravity(focusOn(face())))
  .roundCorners(max());
const tech = cld.image("event_images/technology_rttjat");
export const techImg = tech
  .resize(fill().width(150).height(150).gravity(focusOn(face())))
  .roundCorners(max());

const food = cld.image("event_images/food_i2jtro");
export const foodImg = food
  .resize(fill().width(150).height(150).gravity(focusOn(face())))
  .roundCorners(max());
const fair = cld.image("event_images/fairs_fntvdx");
export const fairImg = fair
  .resize(fill().width(150).height(150).gravity(focusOn(face())))
  .roundCorners(max());

const enter = cld.image("event_images/entretenimiento_rzzwlm");
export const enterImg = enter
  .resize(fill().width(150).height(150).gravity(focusOn(face())))
  .roundCorners(max());

//Imágenes about
const tech1 = cld.image("event_images/logos/TechInnovations_cvckez");
export const tech1Img = tech1.resize(fill().width(300).height(300));
const olivia = cld.image("event_images/logos/OliviaWilsonGallery_euhjlh");
export const oliviaImg = olivia.resize(fill().width(300).height(300));
const foodLogo = cld.image("event_images/logos/HotSauceCo_u2fnis");
export const foodLogoImg = foodLogo.resize(fill().width(300).height(300));
const madison = cld.image("event_images/logos/madisonLogo_r5bzzo");
export const madisonImg = madison.resize(fill().width(300).height(300));

const global = cld.image("event_images/logos/GlobalSolutionsCo_khfnyu");
export const globalImg = global.resize(fill().width(300).height(300));

//Imágenes Equipo
const leo = cld.image("leo");
export const leoImg = leo.resize(fill().width(100).height(100));
