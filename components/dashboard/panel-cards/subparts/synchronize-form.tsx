import LoaderButton from "./loader-button";

type SynchronizeButtonProps = {
  synchronize: () => Promise<void>;
};

function SynchronizeForm({ synchronize }: SynchronizeButtonProps) {
  return (
    <form action={async () => {
      "use server";
      await synchronize();
    }}>
      <LoaderButton text="Synchronize" />
    </form>
  );
}

export default SynchronizeForm;
