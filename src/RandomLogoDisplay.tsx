import { useEffect, useRef, useState } from "react";

const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const useRandomInterval = (
  callback: () => void,
  minDelay = 3000,
  maxDelay = 5000
): void => {
  const timeoutId = useRef(0);

  useEffect(() => {
    const handleTick = () => {
      const nextTickAt = random(minDelay, maxDelay);
      timeoutId.current = window.setTimeout(() => {
        callback();
        handleTick();
      }, nextTickAt);
    };
    handleTick();

    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay, callback]);
};

type RandomLogoDisplayProps = {
  logoList: string[];
  slots?: number;
};

type LogoAnimation = "animate-fadeOut" | "animate-fadeIn";

export function RandomLogoDisplay({
  logoList,
  slots = 3,
}: RandomLogoDisplayProps) {
  const [slot1, setSlot1] = useState(logoList[0]);
  const [slot2, setSlot2] = useState(logoList[1]);
  const [slot3, setSlot3] = useState(logoList[2]);

  const [slot1Effect, setSlot1Effect] =
    useState<LogoAnimation>("animate-fadeIn");
  const [slot2Effect, setSlot2Effect] =
    useState<LogoAnimation>("animate-fadeIn");
  const [slot3Effect, setSlot3Effect] =
    useState<LogoAnimation>("animate-fadeIn");

  const [availableLogo, setAvailableLogo] = useState(logoList.slice(slots));

  const switchLogo = () => {
    const slotIndexToSwitchLogo = random(0, 3);
    const newLogoIndex = random(0, logoList.length - slots);
    const newLogo = availableLogo[newLogoIndex];
    availableLogo.splice(newLogoIndex, 1, slot1);

    switch (slotIndexToSwitchLogo) {
      case 0:
        setSlot1Effect("animate-fadeOut");
        setTimeout(() => {
          availableLogo.splice(newLogoIndex, 1, slot1);
          setSlot1(newLogo);
          setSlot1Effect("animate-fadeIn");
        }, 1000);
        break;
      case 1:
        setSlot2Effect("animate-fadeOut");
        setTimeout(() => {
          availableLogo.splice(newLogoIndex, 1, slot2);
          setSlot2(newLogo);
          setSlot2Effect("animate-fadeIn");
        }, 1000);
        break;
      case 2:
        setSlot3Effect("animate-fadeOut");
        setTimeout(() => {
          availableLogo.splice(newLogoIndex, 1, slot3);
          setSlot3(newLogo);
          setSlot3Effect("animate-fadeIn");
        }, 1000);
        break;
    }
  };

  useRandomInterval(switchLogo);

  return (
    <div className="md:w-10/12 mx-auto flex gap-10 justify-around flex-wrap mb-20">
      <img
        alt="slot1"
        src={slot1}
        className={`w-[200px] h-[100px] object-contain ${slot1Effect}`}
      />
      <img
        alt="slot2"
        src={slot2}
        className={`w-[200px] h-[100px] object-contain ${slot2Effect}`}
      />
      <img
        alt="slot3"
        src={slot3}
        className={`w-[200px] h-[100px] object-contain ${slot3Effect}`}
      />
    </div>
  );
}
