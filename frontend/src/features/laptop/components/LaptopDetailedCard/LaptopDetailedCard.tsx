import { Card, Text, Title, Image, Stack, Table, Grid, GridCol } from "@mantine/core";
import { Navigate } from "react-router-dom";
import { useLaptop } from "../../hooks/useLaptop";

function LaptopDetailedCard({ laptopID }: { laptopID: string }) {
  const { laptop, isLoading } = useLaptop(laptopID);  

  // if (!isLoading && !laptop) {
  //     return (
  //       <>
  //         <Navigate to="/not-found" />
  //       </>
  //     );
  //   }
    
  const table_items = laptop ? (Object.entries(laptop.specifications)
    .filter(([key])=> key !== "_id")
    .map(([key, value]) => (
      <Table.Tr key={key}>
        <Table.Td><Text tt="uppercase" fw={700}>{key}</Text></Table.Td>
        <Table.Td>{value}</Table.Td>
      </Table.Tr>
    ))
  ) : null;

  return (
    <Card withBorder shadow="md" radius="lg" p={20}>
      <Grid align="start">
        <GridCol span={{base: 12, sm: 6}}>
          <Image src={laptop?.imgUrl} alt={laptop?.model_name} radius="md" mb={20} />
        </GridCol>
        <GridCol span={{base: 12, sm: 6}}>
        <Stack ml={30} align="flex-start">
          <Title tt="uppercase" fz="1.5em" fw={700}>
            {laptop?.brand_id.brand_name}
          </Title>
          <Title order={2} fz="xl" fw={600}>
            {laptop?.model_name}
          </Title>
          <Title order={3} fz="xl" fw={600}>
            Specifications
          </Title>
          <Table verticalSpacing="sm" mb={20} withColumnBorders withRowBorders>
            <Table.Tbody>
              {table_items}
            </Table.Tbody>
          </Table>
        </Stack>
        </GridCol>
      </Grid>
    </Card>
  )
}

export default LaptopDetailedCard;