import React from "react";

const OurPartners = () => {
  return (
    <div className="my-20 px-6 max-w-7xl mx-auto">
      <h3 className="md:hidden text-2xl text-center mt-20">
        Our <span className="font-semibold ">Partners</span>
      </h3>
      <div className="lg:bg-base-100 px-6">
        <h3 className="hidden md:block text-2xl lg:text-4xl text-center pt-10">
          Our <span className="font-semibold text-secondary">Partners</span>
        </h3>
        <div className="mb-10 py-20 lg:py-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:flex-wrap justify-center lg:justify-between items-center gap-10 lg:gap-0">
          <div data-aos="zoom-in" className="card my-5 lg:my-0">
            <figure className="w-44 mx-auto">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MmuEJaP5kgHz1tPNTgFdBSyZ4CxBsiJo_g&usqp=CAU"
                alt="makita"
                className="rounded-xl"
              />
            </figure>
          </div>
          <div data-aos="zoom-in" className="card my-5 lg:my-0">
            <figure className="w-44 mx-auto">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYOwhtts9eH-qEg_e2aQLow24-zb6xEl8CQ&usqp=CAU"
                alt="fein"
                className="rounded-xl"
              />
            </figure>
          </div>
          <div data-aos="zoom-in" className="card my-5 lg:my-0">
            <figure className="w-44 mx-auto">
              <img
                src="https://demo.web3canvas.com/themeforest/offshore/images/partner3.png"
                alt="total"
                className="rounded-xl"
              />
            </figure>
          </div>
          <div data-aos="zoom-in" className="card my-5 lg:my-0">
            <figure className="w-44 mx-auto">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyj5wzvZbDfxXniZaEA2pUECurmKbm32-J4w&usqp=CAU"
                alt="depot"
                className="rounded-xl"
              />
            </figure>
          </div>
          <div data-aos="zoom-in" className="card my-5 lg:my-0">
            <figure className="w-44 mx-auto">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxBUbXiYGpptSM9sghM5vYqvFWfEI-jH7VgQ&usqp=CAU"
                alt="cre"
                className="rounded-xl"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
