import { v4 as uuidv4 } from "uuid";
import Roll from '../roll.PNG'
import Chat2 from '../chat1.png'
import Video1 from '../video1.jpeg'
import Mole1 from '../mole1.jpeg'
import Chat1 from '../chat1.png'
import Todo from '../todo.jpeg'
import Scratch from '../scratch.jpeg'
import Hmt from '../hmt.jpeg'
import Add from '../add1.png'
import Raven from '../raven.jpeg'
import Card from '../card.jpeg'
import Nemo from '../nemo.jpeg'
import Css from '../css2.png'
import Bubble from '../bubble.jpeg'
import Chatapp from '../chatapp.jpeg'
import PFN from '../pff.PNG'

const projects = [
  {
    id: uuidv4(),
    name: "Pentecostal Fellowship of Nigeria, Lagos State",
    desc: "Built with MERN Stack for the Church Organization",
    img: PFN,
    lan: "#react #node #express #mongo #cloudinary #heroku(free)",
  },
  {
    id: uuidv4(),
    name: "Chat App",
    desc: "A very simple group chat app for friends",
    img: Chat2,
    lan: "#react #react-chat-engine",
  },
  {
    id: uuidv4(),
    name: "Game (Tank)",
    desc: "Simple and interesting game, thanks to scratch!",
    img: Scratch,
    lan: "#scratch",
  },
  {
    id: uuidv4(),
    name: "Video Chat App (ZOOM clone)",
    desc: "A video chat application to interact with friends and family",
    img: Video1,
    lan: "#react ",
  },
  {
    id: uuidv4(),
    name: "Hotel Mgmt System",
    desc: "A complete Hotel Managment system. Wiith complete functional admin dashboard",
    img: Hmt,
    lan: "#node #express #mysql #ejs #bootstrap",
  },
  {
    id: uuidv4(),
    name: "Game (Rapid Roll)",
    desc: "Almost similar to our then childhood Nokia Rapid Roll game",
    img: Roll,
    lan: "#javascript",
  },
  {
    id: uuidv4(),
    name: "No/low Code App",
    desc: "Simpe Ecommerce design built with Bubble.io",
    img: Bubble,
    lan: "#bubble",
  },
  {
    id: uuidv4(),
    name: "Add to cart",
    desc: "A very simple ecommerce just to show you what javascript can do",
    img: Add,
    lan: "#javascript",
  },
  {
    id: uuidv4(),
    name: "Game (Raven)",
    desc: "A powerful and interesting javascript game for PC only",
    img: Raven,
    lan: "#javascript #HTML5_canvas",
  },
  {
    id: uuidv4(),
    name: "Simple chat app",
    desc: "For private interaction with friend",
    img: Chat1,
    lan: "#node #socket.io #javascript",
  },
  {
    id: uuidv4(),
    name: "Todo app",
    desc: "CRUD operation Todo app",
    img: Todo,
    lan: "#node #express #mysql",
  },
  {
    id: uuidv4(),
    name: "Game (Whack a mole)",
    desc: "Bored? Whack A Mole!",
    img: Mole1,
    lan: "#javascript",
  },
  {
    id: uuidv4(),
    name: "Credit Card Hover",
    desc: "Feel the power of css",
    img: Card,
    lan: "#css",
  },
  {
    id: uuidv4(),
    name: "Game (Save Nemo)",
    desc: "High quality game for high quality PCs",
    img: Nemo,
    lan: "#javascript #HTML5_canvas",
  },
  {
    id: uuidv4(),
    name: "Rotating earth 3d",
    desc: "For your viewing pleasure",
    img: Css,
    lan: "#css",
  },
  {
    id: uuidv4(),
    name: "Chat app",
    desc: "A group chat app for friends & family",
    img: Chatapp,
    lan: "#socket.io #node",
  },
  {
    id: uuidv4(),
    name: "More projects soon",
    desc: "I'm working on more project. If you have anyone you'll like me to build, please contact me",
   
    lan: "",
  },
];

export default projects;