export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  finance: {
    Tables: {
      payments: {
        Row: {
          amount: number
          constant_symbol: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: number
          message_for_receiver: string | null
          meta: Json | null
          receiver_account: string | null
          sender_account: string | null
          sender_bank_code: string | null
          sender_bank_name: string | null
          sender_name: string
          transaction_date: string
          transaction_id: number | null
          transaction_type: string | null
          user_name: string | null
          variable_symbol: string | null
        }
        Insert: {
          amount: number
          constant_symbol?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          message_for_receiver?: string | null
          meta?: Json | null
          receiver_account?: string | null
          sender_account?: string | null
          sender_bank_code?: string | null
          sender_bank_name?: string | null
          sender_name: string
          transaction_date: string
          transaction_id?: number | null
          transaction_type?: string | null
          user_name?: string | null
          variable_symbol?: string | null
        }
        Update: {
          amount?: number
          constant_symbol?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          message_for_receiver?: string | null
          meta?: Json | null
          receiver_account?: string | null
          sender_account?: string | null
          sender_bank_code?: string | null
          sender_bank_name?: string | null
          sender_name?: string
          transaction_date?: string
          transaction_id?: number | null
          transaction_type?: string | null
          user_name?: string | null
          variable_symbol?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  leen: {
    Tables: {
      messages: {
        Row: {
          client: string | null
          created_at: string | null
          email: string | null
          id: number
          message: string
          meta: Json | null
          modified_at: string | null
          name: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          client?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          message: string
          meta?: Json | null
          modified_at?: string | null
          name?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          client?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          message?: string
          meta?: Json | null
          modified_at?: string | null
          name?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  mobile_services: {
    Tables: {
      data_tariff: {
        Row: {
          data_limit_mb: number | null
          data_tariff_id: number
          monthly_fee: number
          name: string
        }
        Insert: {
          data_limit_mb?: number | null
          data_tariff_id?: number
          monthly_fee: number
          name: string
        }
        Update: {
          data_limit_mb?: number | null
          data_tariff_id?: number
          monthly_fee?: number
          name?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          comment: string | null
          created_at: string | null
          expense_id: number
          group_name: string | null
          month: number
          phone_number: string | null
          type: string | null
          year: number
        }
        Insert: {
          amount: number
          comment?: string | null
          created_at?: string | null
          expense_id?: number
          group_name?: string | null
          month: number
          phone_number?: string | null
          type?: string | null
          year: number
        }
        Update: {
          amount?: number
          comment?: string | null
          created_at?: string | null
          expense_id?: number
          group_name?: string | null
          month?: number
          phone_number?: string | null
          type?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "tariff_per_group"
            referencedColumns: ["group_name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items"
            referencedColumns: ["group_name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items_2"
            referencedColumns: ["group_name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "vw_phone_user_group"
            referencedColumns: ["group_name"]
          },
          {
            foreignKeyName: "mobile_services_expenses_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["phone_number"]
          },
          {
            foreignKeyName: "mobile_services_expenses_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "vw_phone_user_group"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      groups: {
        Row: {
          discount: number | null
          group_id: number
          margin: number | null
          name: string
        }
        Insert: {
          discount?: number | null
          group_id?: number
          margin?: number | null
          name: string
        }
        Update: {
          discount?: number | null
          group_id?: number
          margin?: number | null
          name?: string
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          amount: number
          details: Json | null
          invoice_item_id: number
          invoice_number: number
          phone_number: string
        }
        Insert: {
          amount?: number
          details?: Json | null
          invoice_item_id?: number
          invoice_number: number
          phone_number: string
        }
        Update: {
          amount?: number
          details?: Json | null
          invoice_item_id?: number
          invoice_number?: number
          phone_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["phone_number"]
          },
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "vw_phone_user_group"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          due_date: string
          href: string
          invoice_number: number
          is_paid: boolean
          issue_date: string
          payment_date: string | null
          title: string
        }
        Insert: {
          amount: number
          due_date: string
          href: string
          invoice_number: number
          is_paid?: boolean
          issue_date: string
          payment_date?: string | null
          title: string
        }
        Update: {
          amount?: number
          due_date?: string
          href?: string
          invoice_number?: number
          is_paid?: boolean
          issue_date?: string
          payment_date?: string | null
          title?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          date: string
          group_id: number
          payment_id: number
        }
        Insert: {
          amount: number
          date: string
          group_id: number
          payment_id?: number
        }
        Update: {
          amount?: number
          date?: string
          group_id?: number
          payment_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "payments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["group_id"]
          },
          {
            foreignKeyName: "payments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items"
            referencedColumns: ["group_id"]
          },
          {
            foreignKeyName: "payments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items_2"
            referencedColumns: ["group_id"]
          },
        ]
      }
      phone_numbers: {
        Row: {
          created_at: string | null
          data_tariff_id: number | null
          modified_at: string | null
          phone_number: string
          phone_number_id: number
          status: string
          tariff_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          data_tariff_id?: number | null
          modified_at?: string | null
          phone_number: string
          phone_number_id?: number
          status?: string
          tariff_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          data_tariff_id?: number | null
          modified_at?: string | null
          phone_number?: string
          phone_number_id?: number
          status?: string
          tariff_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_numbers_data_tariff_id_fkey"
            columns: ["data_tariff_id"]
            isOneToOne: false
            referencedRelation: "data_tariff"
            referencedColumns: ["data_tariff_id"]
          },
          {
            foreignKeyName: "phone_numbers_tariff_id_fkey"
            columns: ["tariff_id"]
            isOneToOne: false
            referencedRelation: "tariff"
            referencedColumns: ["tariff_id"]
          },
          {
            foreignKeyName: "phone_numbers_tariff_id_fkey"
            columns: ["tariff_id"]
            isOneToOne: false
            referencedRelation: "tariff_per_group"
            referencedColumns: ["tariff_id"]
          },
          {
            foreignKeyName: "phone_numbers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tariff: {
        Row: {
          action_price: number | null
          call_rate: number | null
          data: number | null
          description: string | null
          mms_rate: number | null
          monthly_fee: number
          name: string
          sms_rate: number | null
          tariff_id: number
        }
        Insert: {
          action_price?: number | null
          call_rate?: number | null
          data?: number | null
          description?: string | null
          mms_rate?: number | null
          monthly_fee: number
          name: string
          sms_rate?: number | null
          tariff_id?: number
        }
        Update: {
          action_price?: number | null
          call_rate?: number | null
          data?: number | null
          description?: string | null
          mms_rate?: number | null
          monthly_fee?: number
          name?: string
          sms_rate?: number | null
          tariff_id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          group_id: number
          name: string
          user_id: number
        }
        Insert: {
          email?: string | null
          group_id: number
          name: string
          user_id?: number
        }
        Update: {
          email?: string | null
          group_id?: number
          name?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["group_id"]
          },
          {
            foreignKeyName: "users_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items"
            referencedColumns: ["group_id"]
          },
          {
            foreignKeyName: "users_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items_2"
            referencedColumns: ["group_id"]
          },
        ]
      }
    }
    Views: {
      group_expenses_summary: {
        Row: {
          group_name: string | null
          month: number | null
          total_amount: number | null
          unique_phone_count: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items"
            referencedColumns: ["group_name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "vw_invoice_items_2"
            referencedColumns: ["group_name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "vw_phone_user_group"
            referencedColumns: ["group_name"]
          },
          {
            foreignKeyName: "expenses_group_name_fkey"
            columns: ["group_name"]
            isOneToOne: false
            referencedRelation: "tariff_per_group"
            referencedColumns: ["group_name"]
          },
        ]
      }
      payment_view: {
        Row: {
          amount: number | null
          combined_names: string | null
          created_at: string | null
          transaction_date: string | null
        }
        Insert: {
          amount?: number | null
          combined_names?: never
          created_at?: string | null
          transaction_date?: string | null
        }
        Update: {
          amount?: number | null
          combined_names?: never
          created_at?: string | null
          transaction_date?: string | null
        }
        Relationships: []
      }
      vw_invoice_items: {
        Row: {
          amount: number | null
          group_id: number | null
          group_margin: number | null
          group_name: string | null
          invoice_number: number | null
          issue_date: string | null
          phone_number: string | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["phone_number"]
          },
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "vw_phone_user_group"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      vw_invoice_items_2: {
        Row: {
          amount: number | null
          group_id: number | null
          group_margin: number | null
          group_name: string | null
          invoice_number: number | null
          issue_date: string | null
          listed: boolean | null
          phone_number: string | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["invoice_number"]
          },
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["phone_number"]
          },
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "vw_phone_user_group"
            referencedColumns: ["phone_number"]
          },
        ]
      }
      vw_phone_user_group: {
        Row: {
          data_limit_gb: number | null
          data_tariff_monthly_fee: number | null
          data_tariff_name: string | null
          group_discount: number | null
          group_margin: number | null
          group_name: string | null
          phone_number: string | null
          tariff_monthly_fee: number | null
          tariff_name: string | null
          user_name: string | null
        }
        Relationships: []
      }
      vw_profit_per_phone: {
        Row: {
          expenses: number | null
          month: number | null
          phone_number: string | null
          profit: number | null
          revenue: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["phone_number"]
          },
          {
            foreignKeyName: "invoice_items_phone_number_fkey"
            columns: ["phone_number"]
            isOneToOne: false
            referencedRelation: "vw_phone_user_group"
            referencedColumns: ["phone_number"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      log: {
        Row: {
          correct_pass: boolean | null
          created_at: string
          from: string | null
          id: number
          meta: Json | null
          MODE: string | null
          params: string | null
          queries: string | null
          to: string | null
          user: string | null
        }
        Insert: {
          correct_pass?: boolean | null
          created_at?: string
          from?: string | null
          id?: number
          meta?: Json | null
          MODE?: string | null
          params?: string | null
          queries?: string | null
          to?: string | null
          user?: string | null
        }
        Update: {
          correct_pass?: boolean | null
          created_at?: string
          from?: string | null
          id?: number
          meta?: Json | null
          MODE?: string | null
          params?: string | null
          queries?: string | null
          to?: string | null
          user?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      tariff_per_group: {
        Row: {
          action_price: number | null
          call_rate: number | null
          data: number | null
          group_name: string | null
          mms_rate: number | null
          monthly_fee: number | null
          sms_rate: number | null
          tariff_id: number | null
          tariff_name: string | null
          total_price: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
