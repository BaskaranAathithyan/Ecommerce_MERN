import React from "react";
import man from "../pics/man.png";
import "../style/about.css";

export default function AboutUsScreen() {
  return (
    <div>
      <div className="content">
        <h2 className="Heading">What we Do in 2022</h2>
        <p className="para">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply
          random text. It has roots in a piece of classical Latin literature
          from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
          professor at Hampden-Sydney College in Virginia, looked up one of the
          more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
          going through the cites of the word in classical literature,
          discovered the undoubtable source. Lorem Ipsum comes from sections
          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
          of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
          on the theory of ethics, very popular during the Renaissance. The
          first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from
          a line in section 1.10.32.
        </p>

        <h2 className="Heading">Meet out Team</h2>
        <div class="cards-list">
          <div class="cards 1">
            <div class="card_image">
              <img src={man} />{" "}
            </div>
            <div class="card_title title-white">
              <p>CEO</p>
            </div>
          </div>

          <div class="cards 2">
            <div class="card_image">
              <img src={man} />
            </div>
            <div class="card_title title-white">
              <p>Executive Director</p>
            </div>
          </div>

          <div class="cards 3">
            <div class="card_image">
              <img src={man} />
            </div>
            <div class="card_title title-black">
              <p>Management Executive</p>
            </div>
          </div>

          <div class="cards 4">
            <div class="card_image">
              <img src={man} />
            </div>
            <div class="card_title title-black">
              <p>Marketing Manager</p>
            </div>
          </div>

          <div class="cards 5">
            <div class="card_image">
              <img src={man} />
            </div>
            <div class="card_title title-black">
              <p>Graphic Designer</p>
            </div>
          </div>

          <div class="cards 6">
            <div class="card_image">
              <img src={man} />
            </div>
            <div class="card_title title-black">
              <p>Graphic Designer</p>
            </div>
          </div>

          <div className="story">
            <h2 className="Heading">Our Story</h2>
            <p className="para">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
          </div>
        </div>
      </div>
      <div>
        <footer className="bg-dark text-light">
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="/" className="me-4 text-reset">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="me-4 text-reset">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className="me-4 text-reset">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </section>
          <section>
            <form action="">
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>For more questions.. We are here for you!</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your Thoughts & Questions"
                    />
                  </div>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </section>

          <div className="text-center p-4">© 2022 Copyright: Aathi</div>
        </footer>
      </div>
    </div>
  );
}
