interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

const fontSizeClasses = {
  "Small": "lg:text-2xl",
  "Normal": "lg:text-3xl",
  "Large": "lg:text-4xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`text-3xl uppercase font-normal
                   leading-8 lg:leading-10
                  text-primary
                  ${fontSizeClasses[props.fontSize || "Normal"]}
                `}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={`
                  uppercase font-thin leading-8 lg:leading-6
                  ${props.colorReverse ? "text-primary-content" : "text-sm"}
                `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
