import LoaderButton from "./loader-button";

type SynchronizeButtonProps = {
  athleteId: number;
  synchronize: (athleteId: number) => Promise<void>;
};

function SynchronizeForm({ athleteId, synchronize }: SynchronizeButtonProps) {
  return (
    <form action={async () => {
      "use server";
      await synchronize(athleteId);
    }}>
      <LoaderButton text="Synchronize" />
    </form>
  );
}

export default SynchronizeForm;
