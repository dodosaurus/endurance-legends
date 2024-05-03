import LoaderButton from "./loader-button";

type SynchronizeButtonProps = {
  athleteId: number;
  synchronize: (athleteId: number) => Promise<void>;
};

function SynchronizeForm({ athleteId, synchronize }: SynchronizeButtonProps) {
  const syncWithAthleteId = synchronize.bind(null, athleteId)

  return (
    <form action={syncWithAthleteId}>
      <LoaderButton text="Synchronize" />
    </form>
  );
}

export default SynchronizeForm;
