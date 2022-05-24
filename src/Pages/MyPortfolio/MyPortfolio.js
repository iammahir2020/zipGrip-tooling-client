import React, { useEffect, useState } from "react";
import Footer from "../Shared/Footer/Footer";
import heroImg from "../../images/background/developer.png";
import handShake from "../../images/background/hand.gif";
import skills from "../../images/background/skills.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import git from "../../images/logo/git.png";
import github from "../../images/logo/github.png";
import heroku from "../../images/logo/heroku.png";
import vscode from "../../images/logo/vscode.png";
import figma from "../../images/logo/figma.png";
import chromedevtool from "../../images/logo/chromedevtool.jpg";
import firebase from "../../images/logo/firebase.png";
import iub from "../../images/logo/iub.jpg";

const MyPortfolio = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);
  return (
    <div className=" bg-[#eff0f3]">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={heroImg}
            className="w-full max-w-lg hidden lg:block"
            alt="hero-img"
          />
          <div className="px-3">
            <div className="flex gap-5 items-center">
              <h2 className="text-2xl lg:text-4xl">Hi! I'm</h2>{" "}
              <img
                className="w-16 lg:w-20 rounded-full"
                src={handShake}
                alt="handShake"
              />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold">Mahir Al Kamal</h1>
            <p className="py-6 text-2xl">
              A driven individual that thrives on working on end-to-end products
              that generate sustainable and scalable social and technical
              systems to make a difference.
            </p>
            <div className="mb-5 flex items-center gap-5">
              <a
                href="https://github.com/iammahir2020"
                rel="noreferrer"
                target={"_blank"}
                className="rounded-full bg-black px-3 py-2 text-3xl"
              >
                <FontAwesomeIcon className=" text-white" icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/mahiralkamal/"
                rel="noreferrer"
                target={"_blank"}
                className="rounded-full bg-blue-900 px-3 py-2 text-3xl"
              >
                <FontAwesomeIcon className=" text-white" icon={faLinkedin} />
              </a>
              <a
                href="https://www.google.com/"
                rel="noreferrer"
                target={"_blank"}
                className="rounded-full bg-red-500 px-3 py-2 text-3xl"
              >
                <FontAwesomeIcon className="  text-white" icon={faGoogle} />
              </a>
            </div>
            <a
              href="https://drive.google.com/file/d/1MsF2pU1tY8Ik7U-2kyWo-A3a_TZKLbpZ/view?usp=sharing"
              rel="noreferrer"
              target={"_blank"}
              className="btn bg-gradient-to-r from-secondary to-primary text-white mt-2"
            >
              See My Resume
            </a>
          </div>
        </div>
      </div>
      <h3 className="text-2xl lg:text-4xl text-center mb-10">
        <span className="font-semibold ">Skills.</span> I have
      </h3>
      <div className="hero mb-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="bg-base-100 lg:bg-transparent">
            <div className="lg:flex lg:gap-2">
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="card w-auto max-w-lg shadow-2xl mb-2"
              >
                <div className="card-body">
                  <h2 className="card-title">Expertise</h2>
                  <div className=" flex flex-wrap gap-2">
                    <button className="btn">React.js</button>
                    <button className="btn">ES6</button>
                    <button className="btn">JavaScript</button>
                    <button className="btn">HTML5</button>
                    <button className="btn">CSS3</button>
                    <button className="btn">Bootstrap5</button>
                    <button className="btn">Tailwind</button>
                    <button className="btn">DaisyUI</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex lg:gap-2">
              <div
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="1000"
                className="card w-auto max-w-lg shadow-2xl mb-2"
              >
                <div className="card-body">
                  <h2 className="card-title">Comfortable</h2>
                  <div className=" flex flex-wrap gap-2">
                    <button className="btn">npm</button>
                    <button className="btn">Node.js</button>
                    <button className="btn">Express.js</button>
                    <button className="btn">Mongodb</button>
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-left"
                data-aos-delay="1000"
                data-aos-duration="1000"
                className="card w-auto max-w-lg shadow-2xl mb-2"
              >
                <div className="card-body">
                  <h2 className="card-title">Familier</h2>
                  <div className=" flex flex-wrap gap-2">
                    <button className="btn">Context API</button>
                    <button className="btn">Rest API</button>
                    <button className="btn">C++</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={skills}
            className="w-full max-w-xs hidden lg:block"
            alt="hero-img"
          />
        </div>
      </div>
      <h3 className="md:hidden text-2xl text-center mt-20">
        <span className="font-semibold ">Technologies.</span> I know
      </h3>
      <div className="lg:bg-base-100 px-6">
        <h3 className="hidden md:block text-2xl lg:text-4xl text-center pt-10">
          <span className="font-semibold ">Technologies.</span> I know
        </h3>
        <div className="mb-10 py-20 lg:py-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:flex-wrap justify-center lg:justify-between items-center lg:items-baseline gap-10 lg:gap-0">
          <div data-aos="zoom-in" className="card">
            <figure className="w-24 mx-auto">
              <img src={git} alt="git" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-2xl">git</p>
            </div>
          </div>
          <div data-aos="zoom-in" className="card">
            <figure className="w-24 mx-auto">
              <img src={github} alt="github " className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-2xl">github</p>
            </div>
          </div>
          <div data-aos="zoom-in" className="card">
            <figure className="w-24 mx-auto">
              <img src={heroku} alt="heroku " className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-2xl">heroku</p>
            </div>
          </div>
          <div data-aos="zoom-in" className="card">
            <figure className="w-24 mx-auto">
              <img src={vscode} alt="vscode " className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-2xl">VS Code </p>
            </div>
          </div>
          <div data-aos="zoom-in" className="card">
            <figure className="w-24 mx-auto">
              <img src={figma} alt="figma" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-2xl">Figma</p>
            </div>
          </div>
          <div data-aos="zoom-in" className="card">
            <figure className="w-24 mx-auto">
              <img src={firebase} alt="firebase" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-2xl">firebase</p>
            </div>
          </div>
          <div data-aos="zoom-in" className="card">
            <figure className="w-24 mx-auto">
              <img
                src={chromedevtool}
                alt="chromedevtool"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-2xl">Chrome DevTool</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mb-20 px-6">
        <h3 className="text-2xl lg:text-4xl mb-10">
          <span className="font-semibold ">Educational.</span> background
        </h3>
        <div className="card lg:card-side bg-base-100">
          <div className="avatar justify-center md:justify-start">
            <div className="w-52 rounded-xl p-5">
              <img src={iub} alt="iub" />
            </div>
          </div>
          <div className="card-body text-center md:text-left">
            <h2 className="card-title text-2xl">
              Independent University Bangladesh
            </h2>
            <p className="font-semibold">
              Bachelor's in Computer Science &amp; Engineering
            </p>
            <p>Jan'17-Sep'21</p>
          </div>
        </div>
      </div>
      <h3 className=" text-2xl lg:text-4xl text-center my-20">
        <span className="font-semibold ">Personal.</span> Projects
      </h3>
      <div className="max-w-7xl mx-auto mb-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl">{project.name}</h2>
              <p className="text-xl">{project.type}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={project.liveSite}
                  rel="noreferrer"
                  target={"_blank"}
                  className="btn btn-primary text-white btn-sm"
                >
                  Live Site
                </a>
                <a
                  href={project.gitClient}
                  rel="noreferrer"
                  target={"_blank"}
                  className="btn btn-primary text-white btn-sm"
                >
                  Git Client
                </a>
                <a
                  href={project.gitServer}
                  rel="noreferrer"
                  target={"_blank"}
                  className="btn btn-primary text-white btn-sm"
                >
                  Git Server
                </a>
              </div>
              <p className="text-bold">Features:</p>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature._tid}>- {feature.name}</li>
                ))}
              </ul>
              <p className="text-bold">Technologies Used:</p>
              <ul>
                {project.technologies.map((technology) => (
                  <li key={technology._uid}>- {technology.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-base-100 text-base-content my-20 py-5">
        <p className="text-center">
          For more query please email at{" "}
          <span className="font-semibold">mahiralkamal.mak@gmail.com</span>
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyPortfolio;
