import FormItem from "$store/islands/Form.tsx";

interface Inputs {
  name: string;
  type: "text" | "select" | "email" | "telefone" | "textarea";
  placeHolder: string;
  options?: string[];
  required?: boolean;
}

export interface Props {
  title: string;
  inputs: Inputs[];
}

export default function Form({ title, inputs }: Props) {
  return (
    <div class="py-16 md:py-28">
      <section class="xl:container mx-auto flex flex-col items-center justify-center gap-8 mb-16 lg:mb-0 z-10">
        <h2 class="mx-6 lg:mx-0 text-center text-[36px] leading-[125%] font-medium w-[400px] z-10">
          {title}
          {" "}
        </h2>
        <div class="flex flex-col w-full">
          <FormItem
            inputs={inputs}
          />
        </div>
      </section>
    </div>
  );
}
