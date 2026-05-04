import {
  Calendar,
  ChevronRight,
  Clock4,
  Settings,
  SquareMousePointer,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SecondSection = () => {
  const cardData = [
    {
      icon: <Settings className="h-8 w-8" />,
      bgColor: "#f582f9",
      imgtitle: "setting",
      title: "Build and ship fast, be first",
      description:
        "Whatever you want to automate, Make gets you moving. Visually design solutions without code to save time.",
    },
    {
      icon: <SquareMousePointer className="h-8 w-8" />,
      bgColor: "#fd76c8",
      imgtitle: "sent-box",
      title: "Solve smarter, boost efficiency",
      description:
        "When complexity grows, Make lets you customize automations and plug in AI apps for better, faster results.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      bgColor: "#b76ffc",
      imgtitle: "user",
      title: "Orchestrate with clarity and control",
      description:
        "As you think bigger, you can create autonomous AI agents and manage everything with a real-time visual map.",
    },
  ];

  const rowItem = [
    "IT",
    "Operations",
    "Marketing",
    "Sales",
    "Finance",
    "CX",
    "People",
  ];

  const aiSlider = [
    {
      image: "/aislider/openai-gpt-3.png",
      title: "OpenAI",
      bg: "#10A37F",
    },
    {
      image: "/aislider/hubspotcrm.png",
      title: "HubSpot CRM",
      bg: "#FF7A59",
    },
    {
      image: "/aislider/monday.png",
      title: "monday.com",
      bg: "#FB275D",
    },
    {
      image: "/aislider/netsuite.png",
      title: "NetSuite",
      bg: "#000000",
    },
    {
      image: "/aislider/salesforce.png",
      title: "Salesforce",
      bg: "#019CDC",
    },
    {
      image: "/aislider/slack.png",
      title: "Slack",
      bg: "#4A154B",
    },
    {
      image: "/aislider/canva.png",
      title: "Canva",
      bg: "#8B3DFF",
    },
    {
      image: "/aislider/perplexity-ai.png",
      title: "Perplexity AI",
      bg: "#20808D",
    },
    {
      image: "/aislider/deepseek-ai.png",
      title: "DeepSeek AI",
      bg: "#4D6BFE",
    },
  ];

  const successStories = [
    {
      image: "/successStories/Blain_Carter_FS.webp",
      description: "How makes help perks unloack internal efficiency",
      date: "Mar 12, 2026",
      time: "4m",
    },
    {
      image: "/successStories/joe-celonis_2_TNF.webp",
      description:
        "How make AI Agesnts help Celonis lower annual expense auditing costs",
      date: "Nov 25, 2025",
      time: "5m",
    },
    {
      image: "/successStories/success-stories-perks-gabriel-stock.webp",
      description:
        "How Make helps FranklinCovey save $100,000s and free up 100s of hours",
      date: "Sep 30, 2025",
      time: "4m",
    },
  ];

  const reviewData = [
    {
        image: "https://images.ctfassets.net/un655fb9wln6/4mVJAYXotWJeKG66H1xcLo/52b0a64dd7ee9104df1c8abd545e3467/capterra-1_1.svg",
        name: "Capterra",
        rating: "4.8",
        reviewCount: "404"
    },
    {
        image: "https://images.ctfassets.net/un655fb9wln6/6m5yU9NimAwnAuEZRPZgVU/c513be077aad5437318b221fcd61a7fa/g2-reviews_1.svg",
        name: "G2",
        rating: "4.7",
        reviewCount: "238"
    },
    {
        image: "https://images.ctfassets.net/un655fb9wln6/lNwhYnHtxjylTAAJbV5b8/ebb141a29cd8ad5dc38ca6edcc8e2cdb/Frame_2147238296.svg",
        name: "Getapp",
        rating: "4.8",
        reviewCount: "404"
    },
    {
        image: "https://images.ctfassets.net/un655fb9wln6/1E2wzFWbHDQTCj22j5ZOU4/b86d738c2aa480a2852d05fb5edcc152/IT_1.svg",
        name: "Gartner",
        rating: "4.6",
        reviewCount: "20"
    },
  ]

  return (
    <div className="bg-white py-20   text-black">
      {/* Second section */}
      <div className="w-[85%] mx-auto">
        <div className="space-y-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl text-gray-800 font-bold">
            Automate business processes with confidence
          </h1>
          <h3 className="text-lg text-gray-500 ">
            From a simple workflow, to managing AI automation systems across
            your entire business, make it happen with Make.
          </h3>
        </div>

        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card w-full flex flex-col justify-start h-full border  border-gray-200 bg-linear-to-br from-white to-pink-100 rounded-xl p-6 hover:shadow-md"
            >
              <div
                style={{ backgroundColor: card.bgColor }}
                className={` border rounded-xl ring w-16 h-16 flex items-center justify-center text-white`}
              >
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
        <button className="flex items-center text-center my-8 py-3 px-5 mx-auto border rounded-xl font-semibold bg-linear-to-br hover:shadow-md shadow-pink-500 from-purple-700 to-pink-500 hover:to-pink-600 text-white gap-2 ">
          Explore More <ChevronRight />
        </button>
      </div>

      {/* Third section */}
      <div className="w-[85%] mx-auto my-20">
        <div className="space-y-10 text-center max-w-2xl mx-auto">
          <p className="text-pink-400">Solution</p>
          <h1 className="text-3xl font-bold text-gray-800">
            Adapt at speed with visual-first automation and AI
          </h1>
          <h3 className="text-gray-600 text-lg">
            Make drives efficiencies, solves problems, and speeds innovation by
            breaking down silos across your business.
          </h3>
        </div>
        <div className="flex flex-row items-center shadow-md px-5 py-2 rounded-lg justify-evenly gap-10 mt-10">
          {rowItem.map((item, index) => (
            <div
              key={index}
              className="flex w-full items-center gap-2 rounded-xl py-2 px-4 text-gray-600 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Forth Section */}
      <div className="w-[85%] mx-auto my-20">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="left w-full">
            <img src="/activemenu/IT.png" alt="IT-image" />
          </div>
          <div className="right w-full flex flex-col items-start gap-5">
            <h1 className="text-3xl font-black text-gray-800">IT automation</h1>
            <h3 className="text-lg text-gray-600">
              Cut complexity and move faster by automating everything from
              monitoring to incident response. Connect tools, integrate AI,
              reduce manual work, and free your team to focus on innovation.
            </h3>
            <Link
              href="#"
              className=" my-8 py-3 px-5
  border rounded-xl font-semibold
  bg-linear-to-br from-purple-700 to-pink-500
  hover:to-pink-600 hover:shadow-md shadow-pink-500
  text-white gap-2"
            >
              Automate IT
            </Link>{" "}
          </div>
        </div>
      </div>

      {/* Fifth section */}
      <div className="w-[85%] mx-auto my-20">
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <p className="text-pink-500">Applications</p>
          <h1 className="text-3xl font-bold text-gray-900">
            3,000+ pre-built apps. Limitless integration.
          </h1>
          <h3 className="text-purple-400">
            Quickly adapt to new market demands by connecting your entire tech
            stack. Use our massive library of pre-built apps for instant
            workflows, and our flexible platform to integrate any custom system.
          </h3>
        </div>

        <div className="flex gap-10 py-10">
          <div className="overflow-x-hidden py-10">
            <div className="flex animate-scroll gap-20 w-max px-4">
              {[...aiSlider, ...aiSlider].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center py-6 px-10 rounded-3xl ring ring-pink-200 bg-pink-50 min-w-35 hover:scale-105 transition-transform duration-300"
                >
                  <div
                    style={{ backgroundColor: item.bg }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={40}
                      height={40}
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-center">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="flex items-center text-center my-8 py-3 px-5 mx-auto border rounded-xl font-semibold bg-linear-to-br hover:shadow-md shadow-pink-500 from-purple-700 to-pink-500 hover:to-pink-600 text-white gap-2 ">
          Browse apps
        </button>
      </div>

      {/* Sixeth section */}
      <div className="bg-linear-to-br from-[#220041] to-purple-950">
        <div className="w-[85%]  mx-auto py-20">
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <p className="text-pink-500">Success Stories</p>
            <h1 className="text-3xl font-bold text-gray-100">
              Automation success stories
            </h1>
            <h3 className="text-gray-100">
              Go beyond the hype and see how leading companies are achieving
              real results with AI and automation. Discover practical insights
              and proven strategies to transform your own business.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="card w-full flex bg-linear-to-br from-[#32134f] to-[#3f225a] hover:from-[#3f225a] flex-col justify-start h-full border  border-gray-200  rounded-2xl p-2 hover:shadow-md"
              >
                <img
                  className="w-full rounded-2xl h-[30vh] object-cover"
                  src={story.image}
                  alt="success stories image"
                />
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-4 mt-4">
                    <div className="text-gray-300 flex gap-2">
                      <Calendar />
                      <span className="mx-1">{story.date}</span>
                    </div>
                    .
                    <div className="text-gray-300 flex gap-2">
                      <Clock4 />
                      <span className="mx-1">{story.time}</span>
                    </div>
                  </div>
                  <h2 className="text-xl text-gray-100 font-bold mt-4">
                    {story.description}
                  </h2>
                </div>
              </div>
            ))}
            ;
          </div>

          <button className="flex items-center text-center my-8 py-3 px-5 mx-auto border rounded-xl font-semibold bg-linear-to-br hover:shadow-md shadow-pink-500 from-purple-700 to-pink-500 hover:to-pink-600 text-white gap-2 ">
            Explore Success stories
          </button>
        </div>
      </div>

      {/* sevent section */}
      <div className="w-[85%] mx-auto mt-20 space-y-20">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="left flex flex-col gap-5 w-[50%]">
            <p className="text-pink-600 text-lg">AI and automation</p>
            <h1 className="text-3xl font-bold">
              Scale and orchestrate your AI automations
            </h1>
            <h3 className="text-purple-500 text-lg">
              Build faster, more adaptable operations with agentic automation
              you can see and control. Scale with Make AI agents working
              alongside teams. Boost results with 400+ pre-built AI app
              integrations.
            </h3>
            <Link
              href="/"
              className="inline-flex w-fit cursor-pointer py-4 px-6 rounded-xl text-lg text-white
                  bg-linear-to-r from-purple-700 to-pink-600
                  ring-1 ring-white
                  "
            >
              Explore AI automation
            </Link>
          </div>
          <div className="right w-[50%]">
            <img src="/webpage/ai.webp" alt="sevent section" />
          </div>{" "}
        </div>

        <div className="flex flex-col-reverse lg:flex-row">
            <div className="right w-[50%]">
            <img src="/webpage/2.webp" alt="sevent section" />
          </div>{" "}
          <div className="left flex flex-col gap-5 w-[50%]">
            <p className="text-pink-600 text-lg">Enterprise</p>
            <h1 className="text-3xl font-bold">
              Automation and AI impact for enterprise
            </h1>
            <h3 className="text-purple-500 text-lg">
              Empower teams to collaborate, innovate, and adapt at scale. Stay in control with visual orchestration, enhanced security features, and always on support.
            </h3>
            <Link
              href="/"
              className="inline-flex w-fit cursor-pointer py-4 px-6 rounded-xl text-lg text-white
                  bg-linear-to-r from-purple-700 to-pink-600
                  ring-1 ring-white
                  "
            >
              Explore enterprise solutions
            </Link>
          </div>
          
        </div>

        <div className="flex flex-col-reverse lg:flex-row">
          <div className="left flex flex-col gap-5 w-[50%]">
            <p className="text-pink-600 text-lg">Security</p>
            <h1 className="text-3xl font-bold">
              Built on strong foundations
            </h1>
            <h3 className="text-purple-500 text-lg">
              Make helps you to keep your data secure with built-in GDPR, SOC 3, and SOC 2 Type II compliance, encryption, and single sign-on (SSO).
            </h3>
            <Link
              href="/"
              className="inline-flex w-fit cursor-pointer py-4 px-6 rounded-xl text-lg text-white
                  bg-linear-to-r from-purple-700 to-pink-600
                  ring-1 ring-white
                  "
            >
              Security Details
            </Link>
          </div>
          <div className="right w-[50%]">
            <img src="/webpage/soc_type2.webp" alt="sevent section" />
          </div>{" "}
        </div>

      </div>

      {/* Eight Section */}
      <div className='w-[85%] mx-auto mt-20'>
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900"> Leader of customer satisfaction</h1>
        <h3 className="text-gray-600">Join thousands of satisfied customers who give us top ratings.</h3>
        
          </div>
          <div className='flex justify-evenly mt-10 items-center'>
            {reviewData.map((review, index) => (
            <div key={index} className="flex flex-col items-start  gap-4">
                <div className="flex items-center gap-2">
                    <img className='p-2 rounded-full hover:bg-gray-100' src={review.image} alt={review.name} />
                    <h1 className="text-2xl text-gray-800">{review.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <img src="/star.webp" alt="Star" className="w-5 h-5" />
                    <span className='text-purple-500'>{review.rating}</span>
                    <span className="text-gray-500">({review.reviewCount} reviews)</span>
                </div>
            </div>
            ))};
        </div>
        </div>
    </div>
  );
};

export default SecondSection;
