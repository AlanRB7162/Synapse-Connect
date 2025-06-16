import { Select as CharkaSelect, createListCollection, Portal } from "@chakra-ui/react"
import './Select.css'
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T; "2xl"?: T };

type Item = {
  label: string;
  value: string;
};

type SingleSelectProps = {
  multiple?: false;
  value?: string;
  onValueChange?: (value: string) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

type CustomSelectProps = {
  placeholder: string;
  label?: string;
  items: Item[];
  maxW?: ResponsiveValue<string>;
} & (SingleSelectProps | MultipleSelectProps);

export function Select(props: CustomSelectProps){
    const { placeholder, label, items, multiple = false, maxW } = props;
    const collection = createListCollection({ items });

    const navigate = useNavigate();

    const isMultiple = multiple === true;

    const valueForChakra = isMultiple
    ? (props.value ?? [])
    : props.value !== undefined
    ? [props.value]
    : [];

    const handleValueChange = useCallback(
    (details: { value: string[] }) => {
      if (isMultiple) {
        if (details.value.length <= 3) {
          (props.onValueChange as (value: string[]) => void)?.(details.value);
        } else {
          navigate("/meus-cursos/criar", {
            state: {
                toast: {
                    title: "Você só pode selecionar até 3 opções.",
                    type: "warning"
                }
            }
          })
        }
      } else {
        (props.onValueChange as (value: string) => void)?.(details.value[0] ?? "");
      }
    },
    [isMultiple, props]
  );

    return(
        <CharkaSelect.Root multiple={isMultiple} collection={collection} 
        value={valueForChakra as string[]}
        onValueChange={handleValueChange}
        maxW={maxW}
        >
            <CharkaSelect.HiddenSelect />

            {label && <CharkaSelect.Label>{label}</CharkaSelect.Label>}

            <CharkaSelect.Control>
                <CharkaSelect.Trigger className="select-trigger" p={3} border="none">
                    <CharkaSelect.ValueText placeholder={placeholder}/>
                </CharkaSelect.Trigger>
                <CharkaSelect.IndicatorGroup p={3}>
                    <CharkaSelect.ClearTrigger color="#6d5223"/>
                    <CharkaSelect.Indicator color="#6d5223"/>
                </CharkaSelect.IndicatorGroup>
            </CharkaSelect.Control>

            <Portal>
                <CharkaSelect.Positioner>
                    <CharkaSelect.Content maxH="200px" p={2}>
                        {collection.items.map((item) => (
                            <CharkaSelect.Item  item={item} key={item.value} p={2} borderRadius="6px">
                                {item.label}
                                <CharkaSelect.ItemIndicator />
                            </CharkaSelect.Item>
                        ))}
                    </CharkaSelect.Content>
                </CharkaSelect.Positioner>
            </Portal>
        </CharkaSelect.Root>
    )
}