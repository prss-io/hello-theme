import React from "react";
import { ArrowRight } from "lucide-react";
import cx from "classnames";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Page from "@/components/Page";
import * as PRSS from "prss";

const Home = data => {
  PRSS.init(data);
  (window as any).PRSS = PRSS;

  const { blogPosts, featuredImageUrl, featuredImageAlt, heroTitle, heroMessage, heroClass, heroImageUrl } = PRSS.getProp("vars") as any;
  const { content } = PRSS.getProp("item");
  const items = PRSS.getItems("post", true, blogPosts);
  const { rootPath } = PRSS.getAllProps();
  
  const posts = items.slice(0, 6).map((post) => {
    return {
      id: post.uuid,
      title: post.title,
      summary: post.content,
      label: "",
      author: "",
      published: PRSS.formattedDate(post.createdAt),
      url: post.url,
      image: post.vars?.featuredImageUrl || "",
      tags: ["Post"],
    };
  });

  return (
    <Page className="page-blog page-home">
      <Header />
      <main className="pb-6">
        <section className="flex justify-center">
          <div className="relative mx-auto flex max-w-screen-xl flex-col gap-12 mt-6 w-full">
            <div class="container">
              <div class="row">
                <div class={cx("col", "col-12", heroClass)}>
                  <div class="hero__inner">
                    <div class="hero__right">
                      {heroTitle && (
                        <h1 class="hero__title">{heroTitle}</h1>
                      )}

                      {heroMessage && (
                        <p class="hero__description">{heroMessage}</p>
                      )}

                      {content ? (
                        <div className="post-inner-content page__content" dangerouslySetInnerHTML={{ __html: content }} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Page>
  );
};

export default Home;