import { useParams } from "react-router-dom";
import GridLights from "../Challenges/grid-lights/App";
import type { ComponentType } from "react";

const reactChallengesMap: Record<string, ComponentType> = {
  "grid-lights": GridLights,
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
