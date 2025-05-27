import Sambhav from "../assets/Sambhav.jpg"
import Shravani from "../assets/shravani.jpg"
import suhas from "../assets/Suhas.jpeg"
import bharatesh from "../assets/Bharatesh.jpg"
import vikas from "../assets/Vikas.jpg"
import panchu from "../assets/Panchu.jpg"
import praveen from "../assets/Alur.jpg"
import apporva from "../assets/Apoorva.jpg"
import AishwaryaH from "../assets/Aishwarya.jpg"
import varun from "../assets/Varun.jpeg"
import harshitha from "../assets/Harishtha.jpg"
import sangamesh from "../assets/Sangamesh.jpg"
import prerana from "../assets/prerana.jpg"
import prajwal from "../assets/Prajwal.png"
import anirudh from "../assets/Anirudh.jpg"
import poorvi from "../assets/Poorvi.jpg"
import channa from "../assets/channa.jpg"
import sahitya from "../assets/sahitya.jpg"
import omkar from "../assets/Omkar.jpg"
import sidd from "../assets/sidd.jpeg"

export interface Member {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
  portfolio: string;
  email: string;
}

export interface Committee {
  name: string;
  members: Member[];
}

export const committees: Committee[] = [
  {
    name: "",
    members: [
      {
        name: "Sambhav Oswal",
        designation: "Chairperson",
        image: `${Sambhav}`,
        linkedin: "https://www.linkedin.com/in/sambhav-oswal-047778246/",
        portfolio: "https://sambhavoswal23.wixsite.com/sambhav",
        email: "sambhavoswal23@ieee.org",
      },
      {
        name: "Shravani Uppar",
        designation: "Vice Chairperson",
        image: `${Shravani}`,
        linkedin: "https://www.linkedin.com/in/shravani-uppar13/",
        portfolio: "https://shravaniuppar.wixsite.com/shravani-uppar-portf",
        email: "shravaniuppar@gmail.com",
      },
      {
        name: "Suhas Kulkarni",
        designation: "Treasurer",
        image: `${suhas}`,
        linkedin: "https://www.linkedin.com/in/suhas-kulkarni-a5006b245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        portfolio: "https://my.visme.co/view/dm48o9jg-my-portfolio",
        email: "Suhaskulkarni123@ieee.org",
      },
      {
        name: "Bharatesh B",
        designation: "Secretary",
        image: `${bharatesh}`,
        linkedin: "https://www.linkedin.com/in/bharatesh-b-10707a246?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        portfolio: "https://v0-bharatesh-portfolio-design.vercel.app/",
        email: "bharteshbkarbhari@ieee.org",
      },
      {
        name: "Vikas Menasagi",
        designation: "Joint Secretary",
        image: `${vikas}`,
        linkedin: "https://www.linkedin.com/in/vikas-menasagi-4ba074293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        portfolio: "https://lavender-darleen-48.tiiny.site/?mode=suggestions",
        email: "vikasmenasagi0000@gmail.com",
      },
      {
        name: "Panchakshari Jogi",
        designation: "Joint Treasurer",
        image: `${panchu}`,
        linkedin: "https://www.linkedin.com/in/panchakshari-jogi-4a7636278/",
        portfolio: "https://panchaksharijogi.vercel.app/",
        email: "jogipanchakshari11@gmail.com",
      },
    ],
  },
  {
    name: "Operating Committee",
    members: [
      {
        name: "Alur Praveen",
        designation: "Operating Committee Chair",
        image: `${praveen}`,
        linkedin: "https://www.linkedin.com/in/alur-praveen-607899269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        portfolio: "https://alur-praveen.b12sites.com/index",
        email: "alurpraveen4217@ieee.org",
      },
      {
        name: "Varun Naik",
        designation: "MDC Chair",
        image: `${varun}`,
        linkedin: "https://www.linkedin.com/in/varu19/",
        portfolio: "https://v0-engineering-portfolio.vercel.app/",
        email: "varu19@ieee.org",
      },
      {
        name: "Aishwarya H",
        designation: "SAC Chair",
        image: `${AishwaryaH}`,
        linkedin: "https://www.linkedin.com/in/aishwarya-hipparagi-4ba74b277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        portfolio: "https://hishwarya-hipparagi.b12sites.com/index",
        email: "aishuhipparagi@gmail.com",
      },
      {
        name: "Prerana Bali",
        designation: "Meeting Coordinator",
        image: `${prerana}`,
        linkedin: "https://www.linkedin.com/in/prerana-bali-604400261/",
        portfolio: "https://v0-prerana-portfolio.vercel.app/",
        email: "baliprerana@gmail.com",
      },
      {
        name: "Apoorva Joshi",
        designation: "Operating Committee Secretary",
        image: `${apporva}`,
        linkedin: "https://www.linkedin.com/in/apoorva-joshi-5a6599272/",
        portfolio: "https://apoorvajoshiportfolio.netlify.app/",
        email: "apoorvapatil1004@gmail.com",
      },
      {
        name: "Harshita Soudi",
        designation: "Joint SAC",
        image: `${harshitha}`,
        linkedin: "https://www.linkedin.com/in/harshita-j-soudi-54a029294",
        portfolio: "https://zesty-gumdrop-923dde.netlify.app",
        email: "harshithasoudi7@gmail.com",
      },
      {
        name: "Sangamesh K",
        designation: "Membership Coordinator",
        image: `${sangamesh}`,
        linkedin: "https://www.linkedin.com/in/sangamesh-kanabur-770a95292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        portfolio: "https://sangamesh-k.vercel.app/",
        email: "sanguk2005@gmail.com",
      }
      
    ],
  },
  {
    name: "Web Team",
    members: [
      {
        name: "Prajwal Shettar",
        designation: "Webmaster",
        image: `${prajwal}`,
        linkedin: "https://www.linkedin.com/in/prajwalshettar43",
        portfolio: "https://www.linkedin.com/in/prajwalshettar43",
        email: "prajwalshettar43@gmail.com",
      },
      {
        name: "Anirudh Kulkarni",
        designation: "Webmaster",
        image: `${anirudh}`,
        linkedin: "https://www.linkedin.com/in/anirudh-kulkarni-208096276/?msgControlName=view_message_button&msgConversationId=2-YmJmMDQ3MDMtMjgxNS00ODVhLWI5ZmMtYzE3MDgyZThmNTk3XzAxMw%3D%3D&msgOverlay=true",
        portfolio: "https://ports-delta.vercel.app/",
        email: "anirudhkulkarni733@gmail.com",
      },
      {
        name: "Poorvi M",
        designation: "Joint Webmaster",
        image: `${poorvi}`,
        linkedin: "https://www.linkedin.com/in/poorvi-muttinpendimath-b85869292",
        portfolio: "https://silly-empanada-ef74ae.netlify.app",
        email: "poorvimuttinpendimath@gmail.com",
      },
    ],
  },
  {
    name: "Content Team",
    members: [
      {
        name: "Channabasava B",
        designation: "Design Head",
        image: `${channa}`,
        linkedin: "https://www.linkedin.com/in/channabasava-v-ballolli-177a89277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        portfolio: "https://v0-fork-of-portfolio-website-mu.vercel.app/",
        email: "channabasava.bollolli@ieee.org",
      },
      {
        name: "Sahitya P",
        designation: "Editorial Head",
        image: `${sahitya}`,
        linkedin: "https://www.linkedin.com/in/sahitya-p-870240273/",
        portfolio: "https://sahityaportfolio.netlify.app/",
        email: "sahityapolicepatil0@gmail.com",
      },
      {
        name: "Omkar Sanjeev",
        designation: "Design Lead",
        image: `${omkar}`,
        linkedin: "https://www.linkedin.com/in/omkar-sanjeev-9582a5277/",
        portfolio: "https://omkarsanjeev.netlify.app/",
        email: "omkarsanjeev703@gmail.com",
      },
      {
        name: "Siddharudha M B",
        designation: "Social Media Head",
        image: `${sidd}`,
        linkedin: "https://www.linkedin.com/in/siddharudha-m-b-695075293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        portfolio: "https://sidportfolio.codedesign.app/",
        email: "siddharudha.m.b@ieee.org",
      },
    ],
  },
];
