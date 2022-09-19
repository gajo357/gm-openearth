export interface TreeDto {
  id: string;
  species: string;
  year: number;
  height: number;
  trunkCircumference: number;
  created: string;
  updated?: string;
}

export interface TreesDto {
  trees: TreeDto[];
  lastUpdate: string;
}
