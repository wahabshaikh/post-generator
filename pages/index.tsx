import { toJpeg } from "html-to-image";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEventHandler, useCallback, useRef, useState } from "react";

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [reference, setReference] = useState("");
  const [content, setContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ddddff");

  const submitHandler: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (ref.current === null) {
        return;
      }

      toJpeg(ref.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "post";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [ref]
  );

  return (
    <>
      <Head>
        <title>Post Generator</title>
        <meta
          name="description"
          content="Quickly generate social media posts using templates."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen grid place-content-center place-items-center bg-gray-50">
        <h1 className="text-3xl sm:text-5xl font-black text-center">
          Welcome to Post Generator!
        </h1>
        <p className="sm:text-xl text-center mt-2">
          Quickly generate social media posts using templates.
        </p>

        <section className="mt-4 grid gap-8 lg:grid-cols-2">
          <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-4" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="reference"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reference
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="reference"
                    id="reference"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    onChange={(event) => setReference(event.target.value)}
                    value={reference}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="content"
                    id="content"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="background-color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Background Color
                </label>
                <div className="mt-1">
                  <input
                    type="color"
                    name="background-color"
                    id="background-color"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    onChange={(event) => setBackgroundColor(event.target.value)}
                    value={backgroundColor}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate
              </button>
            </form>
          </div>

          <div
            className="order-first lg:order-last flex flex-col justify-end h-96 w-96 pl-16 pr-12 pb-16"
            style={{ backgroundColor }}
            ref={ref}
          >
            <div className="-ml-5">
              <Image
                src="/assets/quote.png"
                width={40}
                height={30}
                alt="quote"
              />
            </div>
            <p className="border-l border-black font-semibold p-6 leading-tight">
              {content}
            </p>
            <p className="uppercase text-xs">{reference}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
