import type { Database } from "./database.types";

export type Tables<
  SchemaName extends keyof Database,
  TableName extends keyof Database[SchemaName]["Tables"]
> = Database[SchemaName]["Tables"][TableName] extends {
  Row: infer R;
}
  ? R
  : never;

export type TablesInsert<
  SchemaName extends keyof Database,
  TableName extends keyof Database[SchemaName]["Tables"] = never
> = Database[SchemaName]["Tables"][TableName] extends { Insert: infer I } ? I : never;

export type TablesUpdate<
  SchemaName extends keyof Database,
  TableName extends keyof Database[SchemaName]["Tables"] = never
> = Database[SchemaName]["Tables"][TableName] extends { Update: infer U } ? U : never;

export type Enums<
  SchemaName extends keyof Database,
  EnumName extends keyof Database[SchemaName]["Enums"]
> = Database[SchemaName]["Enums"][EnumName];
