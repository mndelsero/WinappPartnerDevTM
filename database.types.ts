export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Business: {
        Row: {
          active: boolean | null
          address: string | null
          color: string | null
          created_at: string
          description: string | null
          id: number
          logo: string | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          id?: number
          logo?: string | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          id?: number
          logo?: string | null
          name?: string | null
        }
        Relationships: []
      }
      BusinessAccount: {
        Row: {
          active: boolean | null
          business_id: number | null
          created_at: string
          id: number
          user_id_partner: string | null
        }
        Insert: {
          active?: boolean | null
          business_id?: number | null
          created_at?: string
          id?: number
          user_id_partner?: string | null
        }
        Update: {
          active?: boolean | null
          business_id?: number | null
          created_at?: string
          id?: number
          user_id_partner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_BusinessAccount_bussiness_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          }
        ]
      }
      BusinessCategory: {
        Row: {
          business_id: number | null
          category_id: number | null
          created_at: string
          id: number
        }
        Insert: {
          business_id?: number | null
          category_id?: number | null
          created_at?: string
          id?: number
        }
        Update: {
          business_id?: number | null
          category_id?: number | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_BussinessCategory_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          }
        ]
      }
      Categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Configuration: {
        Row: {
          id: number
          point_value: number | null
        }
        Insert: {
          id?: number
          point_value?: number | null
        }
        Update: {
          id?: number
          point_value?: number | null
        }
        Relationships: []
      }
      DiscountCodes: {
        Row: {
          active: boolean | null
          business_id: number | null
          created_at: string
          description: string | null
          discount: number | null
          id: number
          name: string | null
          point_cost: number | null
          product_id: number | null
          type: number | null
        }
        Insert: {
          active?: boolean | null
          business_id?: number | null
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          name?: string | null
          point_cost?: number | null
          product_id?: number | null
          type?: number | null
        }
        Update: {
          active?: boolean | null
          business_id?: number | null
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          name?: string | null
          point_cost?: number | null
          product_id?: number | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_DiscountCodes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_DiscountCodes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_DiscountCodes_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "DiscountTypes"
            referencedColumns: ["id"]
          }
        ]
      }
      DiscountTypes: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      GeneratedCodes: {
        Row: {
          active: boolean | null
          code: string | null
          created_at: string
          discount_code_id: number | null
          expireAt: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          code?: string | null
          created_at?: string
          discount_code_id?: number | null
          expireAt?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          code?: string | null
          created_at?: string
          discount_code_id?: number | null
          expireAt?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_GeneratedCodes_discount_code_id_fkey"
            columns: ["discount_code_id"]
            isOneToOne: false
            referencedRelation: "DiscountCodes"
            referencedColumns: ["id"]
          }
        ]
      }
      OrderDetails: {
        Row: {
          created_at: string
          id: number
          order_id: number | null
          product_description: string | null
          product_id: number | null
          product_name: string | null
          product_price: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          order_id?: number | null
          product_description?: string | null
          product_id?: number | null
          product_name?: string | null
          product_price?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: number | null
          product_description?: string | null
          product_id?: number | null
          product_name?: string | null
          product_price?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_OrderDetails_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["id"]
          }
        ]
      }
      Orders: {
        Row: {
          business_id: number | null
          created_at: string
          id: number
          notes: string | null
          payment_id: string | null
          status: number | null
          total_price: number | null
          user_id: string | null
        }
        Insert: {
          business_id?: number | null
          created_at?: string
          id?: number
          notes?: string | null
          payment_id?: string | null
          status?: number | null
          total_price?: number | null
          user_id?: string | null
        }
        Update: {
          business_id?: number | null
          created_at?: string
          id?: number
          notes?: string | null
          payment_id?: string | null
          status?: number | null
          total_price?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          }
        ]
      }
      Products: {
        Row: {
          active: boolean | null
          business_id: number | null
          created_at: string
          description: string | null
          id: number
          image: string | null
          name: string | null
          price: string | null
          stock: number | null
        }
        Insert: {
          active?: boolean | null
          business_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          price?: string | null
          stock?: number | null
        }
        Update: {
          active?: boolean | null
          business_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          price?: string | null
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          }
        ]
      }
      ProductsCategory: {
        Row: {
          category_id: number | null
          id: number
          product_id: number | null
        }
        Insert: {
          category_id?: number | null
          id?: number
          product_id?: number | null
        }
        Update: {
          category_id?: number | null
          id?: number
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_ProductsCategory_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ProductsCategory_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          }
        ]
      }
      Status: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Subscriptions: {
        Row: {
          active: boolean | null
          business_id: number | null
          card_number: string | null
          created_at: string
          credits: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          business_id?: number | null
          card_number?: string | null
          created_at?: string
          credits?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          business_id?: number | null
          card_number?: string | null
          created_at?: string
          credits?: number | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      UsedCodes: {
        Row: {
          account_bussiness_id: number | null
          code_id: number | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          account_bussiness_id?: number | null
          code_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          account_bussiness_id?: number | null
          code_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_UsedCodes_account_bussiness_id_fkey"
            columns: ["account_bussiness_id"]
            isOneToOne: false
            referencedRelation: "BusinessAccount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_UsedCodes_code_id_fkey"
            columns: ["code_id"]
            isOneToOne: false
            referencedRelation: "GeneratedCodes"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
