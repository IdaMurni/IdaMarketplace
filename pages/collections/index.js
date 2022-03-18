import React from "react";
import Books from "./books";
import GameCards from "./gamecards";
import Uncategorized from "./uncategorized";
import Breadcrumbs from '../../components/breadcrumbs';
const Collections = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const product = {
    breadcrumbs: [
      { id: 1, name: 'Collections', href: '/collections' },
    ],
    highlights: [
      'Gold 70%',
      'Single Fighter',
      'Two Katanas',
      'Power 70%',
    ],

}
  return (
    <>
      <div className="pl-4 pt-10 mb-10">
          <Breadcrumbs data={product} />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full mt-5">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 flex-row border-b-4 border-violet-600"
            role="tablist"
          >
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-violet-600"
                    : "text-violet-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Uncategorized
              </a>
            </li>
            <li className="-mb-px border-l last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-violet-600"
                    : "text-violet-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 GameCards
              </a>
            </li>
            <li className="-mb-px border-l last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-violet-600"
                    : "text-violet-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                 Books
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <Uncategorized></Uncategorized>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <GameCards></GameCards>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <Books></Books>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Collections />
    </>
  );
}