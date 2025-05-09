import DrImg from './Images/dricon.png';
import { motion } from 'framer-motion';
import Daham from './Images/Comenters/Daham.png';
import Eesara from './Images/Comenters/Eesara.png';
import Girl from './Images/Comenters/Girl.png';


function HomeBottom() {
  const cards = [
    {
      title: "What our customer are saying",
      text: "This website helps us effectively track our medications and monitor our overall health conditions. By using this platform, we can easily keep a record of our prescribed medicines, track dosage adjustments over time, and observe our progress as we recover day by day. It provides a convenient way to stay informed about our treatment plans and ensure that we are following the prescribed regimen for better health outcomes.",
      image: Daham,
    },
    {
      title: "What our customer are saying",
      text: "This platform offers a simple yet effective way to manage our medications and keep track of our health. It helps us log our prescribed medicines, monitor dosage changes, and track our progress in real-time. By using this tool, we can stay on top of our treatment plans and ensure we're following our medication regimen accurately, leading to better health management and recovery outcomes.",
      image: Eesara,
    },
    {
      title: "What our customer are saying",
      text: "This platform allows us to seamlessly manage our health by tracking our medications and monitoring our wellness. It enables us to maintain an up-to-date record of the medicines we're prescribed, manage dosage changes, and assess our progress throughout recovery. By utilizing this website, we stay organized and informed about our treatment, ensuring we're adhering to the prescribed schedule for improved health and recovery.",
      image: Girl,
    },
  ];
  

  const [index, setIndex] = useState(0);

  const nextCard = () => setIndex((index + 1) % cards.length);
  const prevCard = () => setIndex((index - 1 + cards.length) % cards.length);

  const current = cards[index];

  return (
    <div className="mx-48 font-poppins py-12">
      <div className="text-center md:text-left bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text font-bold text-lg md:text-xl">
        HELP TOPICS
      </div>

      <div className="flex flex-wrap justify-between gap-12 mt-3">
        <div className="w-full md:w-1/2">
          <div className="text-4xl font-bold">Virtual healthcare for you</div>
          <div className="text-gray-500 font-bold pt-3">
            MediSync provides progressive and affordable healthcare,
            accessible on mobile and online for everyone.
          </div>
          <div className="my-8">
            <button className="bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 active:bg-purple-900 transition duration-200">
              <a href="/login">Login</a>
            </button>
          </div>
          <div className="text-4xl font-bold mt-20">Leading healthcare providers</div>
          <div className="text-gray-500 font-bold pt-3">
            Our mission is to make quality healthcare accessible to everyone,
            regardless of location or financial constraints. With a user-friendly
            interface, virtual consultations, and a range of health management
            tools, MediSync empowers individuals to take control of their well-being
            from the comfort of their homes.
          </div>
        </div>

        <div className="w-full md:w-auto">
          <img src={DrImg} alt="Doctor" className="w-[400px]" />
        </div>
      </div>

      {/* Card Swapper Section */}
      <div className="flex flex-col items-center justify-center  p-4 mt-16">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-xl p-6 text-center"
        >
          
          <h2 className="text-xl font-bold mb-2">{current.title}</h2>
          <div className="flex gap-3 mt-5">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-28 rounded-full"
          />
          <p className="text-gray-600 text-sm">{current.text}</p>
          </div>
          
        </motion.div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={prevCard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
          >
            
          </button>
          <button
            onClick={nextCard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
          >
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeBottom;
