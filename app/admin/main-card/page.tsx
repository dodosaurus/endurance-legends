import AppCard from "@/components/app-card/app-card";

function MainCard() {
  const testCard = {
    id: 1,
    uuid: "bbfd621c-d589-47b3-9f28-8001de8d4325",
    collectionId: 1,
    rarity: "common",
    name: "POGAČAR Tadej",
    country: "Slovenia",
    dateInfo: "21/09/1998",
    additionalInfo1: "UAE Team Emirates",
    additionalInfo2: "66 kg / 1.76 m",
    extendedInfo: "",
    cardImageUrl: "1-tadej-pogacar.jpg",
    cardImageSource:
      "https://www.independent.co.uk/sport/cycling/tadej-pogacar-giro-ditalia-stage-eight-geraint-thomas-b2543479.html",
  };
  return (
    <div className="flex justify-center items-center">
      <button className="glassy-button">
        <span>Open pack</span>
      </button>
    </div>
  );
}

export default MainCard;
