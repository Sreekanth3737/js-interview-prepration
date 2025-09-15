import { useParams } from "react-router-dom";
import type { ComponentType } from "react";
import GridLights from "../Challenges/grid-lights/App";
import Tabs from "../Challenges/tabs/App";
import InfiniteScroll from "../Challenges/infinite-scroll/App";
import Nested from "../Challenges/nested-checkbox/App";
import Grid from "../Challenges/Grid-colorizer/grid";
import CheckBoxTree from "../Challenges/CheckboxTree/CheckBoxTree";

const reactChallengesMap: Record<string, ComponentType> = {
  "grid-lights": GridLights,
  "tabs-component": Tabs,
  "infinite-scroll": InfiniteScroll,
  "nested-checkbox": Nested,
  "grid-colorizer": Grid,
  "checkbox-tree": CheckBoxTree,
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
