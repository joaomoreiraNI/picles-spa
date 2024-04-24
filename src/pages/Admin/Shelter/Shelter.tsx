import styles from "./Shelter.module.css";

import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel";

export function Shelter() {
  return (
    <Panel>
      <form className={styles.container}>
        <Input label="None" value="" className="" />
        <Button type="submit">Salvar dados</Button>
      </form>
    </Panel>
  );
}
