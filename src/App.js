import React, { useState, useEffect } from "react";
import runewords from "./data.json";

export default function App() {
  const [filter, setFilter] = useState("");
  const [dark, setDark] = useState(DARK_STATE);
  const [items, setItems] = useState(ITEMS_STATE);
  const [sockets, setSockets] = useState(SOCKETS_STATE);

  useEffect(() => localStorage.setItem("DARK", JSON.stringify(dark)), [dark]);
  useEffect(() => localStorage.setItem("ITEMS_2", JSON.stringify(items)), [items]);
  useEffect(() => localStorage.setItem("SOCKETS", JSON.stringify(sockets)), [sockets]);

  const runewordFilter = (key) => {
    const runeword = runewords[key];
    if (filter) {
      if (key.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
    } else if (sockets[runeword.Sockets]) {
      for (const item in runeword.Items) {
        if (items[runeword.Items[item]]) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="App" data-dark={dark}>
      <div className="Settings">
        <div className="Section">
          <p className="Title">Theme</p>
          <label>
            <input type="checkbox" onChange={(event) => setDark(event.currentTarget.checked)} checked={dark} />
            Dark Mode
          </label>
        </div>
        <div className="Section">
          <p className="Title">Filter</p>
          <label>
            <input
              type="search"
              placeholder="Runeword..."
              autoFocus={true}
              onChange={(event) => setFilter(event.currentTarget.value)}
              value={filter}
            />
          </label>
        </div>
        <div className="Section">
          <p className="Title">Items</p>
          {Object.keys(items).map((item) => (
            <label key={item} disabled={!!filter}>
              <input
                type="checkbox"
                disabled={!!filter}
                value={item}
                onChange={(event) =>
                  setItems({
                    ...items,
                    [event.currentTarget.value]: event.currentTarget.checked,
                  })
                }
                checked={items[item]}
              />
              {item.split(/(?=[A-Z])/).join(" ")}
            </label>
          ))}
        </div>
        <div className="Section">
          <p className="Title">Sockets</p>
          {Object.keys(sockets).map((socket) => (
            <label key={socket} disabled={!!filter}>
              <input
                type="checkbox"
                disabled={!!filter}
                value={socket}
                onChange={(event) =>
                  setSockets({
                    ...sockets,
                    [event.currentTarget.value]: event.currentTarget.checked,
                  })
                }
                checked={sockets[socket]}
              />
              {socket}
            </label>
          ))}
        </div>
      </div>
      <div className="Runewords">
        {Object.keys(runewords)
          .filter(runewordFilter)
          .sort()
          .map((name) => (
            <Runeword key={name} name={name} runeword={runewords[name]} />
          ))}
      </div>
    </div>
  );
}

const Runeword = ({ name, runeword }) => (
  <div className="Runeword">
    <div className="Name">
      {name} (Level {runeword.Level})
    </div>
    <div>
      {runeword.Runes.map((rune, index) => (
        <div key={index} className="Rune">
          {rune}
        </div>
      ))}
    </div>
    <div>
      {runeword.Items.map((item, index) => (
        <div key={index} className="Type">
          {item.split(/(?=[A-Z])/).join(" ")}
        </div>
      ))}
    </div>
    <div>
      {runeword.Stats.map((stat, index) => (
        <div key={index} className="Stat">
          {stat}
        </div>
      ))}
    </div>
  </div>
);

const DARK_STATE = () => JSON.parse(localStorage.getItem("DARK")) || false;

const ITEMS_STATE = () =>
  JSON.parse(localStorage.getItem("ITEMS_2")) || {
    Axes: false,
    BodyArmor: true,
    Claws: false,
    Clubs: false,
    Daggers: false,
    Hammers: false,
    Helms: false,
    Maces: false,
    MeleeWeapons: false,
    MissileWeapons: false,
    PaladinShields: false,
    Polearms: false,
    Scepters: false,
    Shields: false,
    Staves: false,
    Swords: false,
    Wand: false,
    Weapons: false,
  };

const SOCKETS_STATE = () =>
  JSON.parse(localStorage.getItem("SOCKETS")) || {
    2: false,
    3: true,
    4: false,
    5: false,
    6: false,
  };
