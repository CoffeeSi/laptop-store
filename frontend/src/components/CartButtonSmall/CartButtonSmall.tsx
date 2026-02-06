import { Button } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";


export function CartButtonSmall({function_}: {function_: Function}) {
  const [isToggled, setIsToggled]  = useState(false);
  return (
    <>
    { isToggled ? (
      <Button radius="xl" component={Link} to='/cart' color="green" style={{ flex: 1 }}>
      Go to cart
      </Button>
    ) : (
      <Button radius="xl" onClick={() => {function_(); setIsToggled(true);}} style={{ flex: 1 }}>
        Buy now
      </Button>
    )}
    </>
  )
}