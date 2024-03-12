import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost flex items-center justify-center"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id="searchHeader" size={20} strokeWidth={0.1} />
      </Button>
    </>
  );
}
