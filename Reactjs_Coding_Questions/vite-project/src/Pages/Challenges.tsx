import { useParams } from "react-router-dom";
import type { ComponentType } from "react";
import GridLights from "../Challenges/grid-lights/App";
import Tabs from "../Challenges/tabs/App";

const reactChallengesMap: Record<string, ComponentType> = {
  "grid-lights": GridLights,
  "tabs-component": Tabs,
};

const Challenges = () => {
  const { id } = useParams<{ id: string }>();

  const ChallengeComponent = id ? reactChallengesMap[id] : null;

  return (
    <div>
      {ChallengeComponent ? <ChallengeComponent /> : <p>Challenge not found</p>}
    </div>
  );
};

export default Challenges;
