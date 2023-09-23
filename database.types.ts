export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          created_at: string
          id: number
          name: string
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "brands_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string | null
          ref: string
          user: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          ref?: string
          user: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          ref?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          address: Json | null
          birthday: string | null
          created_at: string
          id: number
          name: string | null
          obs: string | null
          phone: string | null
          user: string
        }
        Insert: {
          address?: Json | null
          birthday?: string | null
          created_at?: string
          id?: number
          name?: string | null
          obs?: string | null
          phone?: string | null
          user: string
        }
        Update: {
          address?: Json | null
          birthday?: string | null
          created_at?: string
          id?: number
          name?: string | null
          obs?: string | null
          phone?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory: {
        Row: {
          amount: number | null
          created_at: string
          expiration_date: string | null
          id: string
          price: number
          product: string
          user: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          price?: number
          product: string
          user?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          price?: number
          product?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_product_fkey"
            columns: ["product"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          balance: number
          barcode: string | null
          brand: number | null
          category: string | null
          composition: string[] | null
          created_at: string
          id: string
          max: number | null
          min: number | null
          name: string | null
          supplier: string | null
          type: string | null
          unit: number
          user: string | null
        }
        Insert: {
          balance?: number
          barcode?: string | null
          brand?: number | null
          category?: string | null
          composition?: string[] | null
          created_at?: string
          id?: string
          max?: number | null
          min?: number | null
          name?: string | null
          supplier?: string | null
          type?: string | null
          unit: number
          user?: string | null
        }
        Update: {
          balance?: number
          barcode?: string | null
          brand?: number | null
          category?: string | null
          composition?: string[] | null
          created_at?: string
          id?: string
          max?: number | null
          min?: number | null
          name?: string | null
          supplier?: string | null
          type?: string | null
          unit?: number
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_fkey"
            columns: ["brand"]
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_fkey"
            columns: ["category"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_fkey"
            columns: ["supplier"]
            referencedRelation: "supplier"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_unit_fkey"
            columns: ["unit"]
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          company: string | null
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          company?: string | null
          email?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          company?: string | null
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      supplier: {
        Row: {
          address: Json | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          user: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          user?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      units: {
        Row: {
          acronym: string | null
          created_at: string
          id: number
          name: string
          user: string | null
        }
        Insert: {
          acronym?: string | null
          created_at?: string
          id?: number
          name: string
          user?: string | null
        }
        Update: {
          acronym?: string | null
          created_at?: string
          id?: number
          name?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      product_stats: {
        Row: {
          average_price: number | null
          product_name: string | null
          total_amount: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_product_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_inventory: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_product_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          product_name: string
          product_id: string
          total_amount: number
          average_price: number
          last_entry: string
        }[]
      }
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
