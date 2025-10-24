export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          page_path: string | null
          properties: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          page_path?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          page_path?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          api_key: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_name: string
          last_used_at: string | null
          merchant_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name: string
          last_used_at?: string | null
          merchant_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name?: string
          last_used_at?: string | null
          merchant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_challenges: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          message: string
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          message: string
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          message?: string
          wallet_address?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string
          end_date: string
          id: string
          metadata: Json | null
          node_id: string
          provider_id: string
          start_date: string
          status: string
          total_hours: number
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          metadata?: Json | null
          node_id: string
          provider_id: string
          start_date: string
          status?: string
          total_hours: number
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          metadata?: Json | null
          node_id?: string
          provider_id?: string
          start_date?: string
          status?: string
          total_hours?: number
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          phone: string | null
          responded_at: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          phone?: string | null
          responded_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string | null
          responded_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          company: string
          company_size: string
          contacted_at: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          job_title: string
          last_name: string
          message: string | null
          notes: string | null
          phone: string | null
          status: string | null
          timeline: string | null
          updated_at: string
          use_case: string
          user_id: string | null
        }
        Insert: {
          company: string
          company_size: string
          contacted_at?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          job_title: string
          last_name: string
          message?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
          use_case: string
          user_id?: string | null
        }
        Update: {
          company?: string
          company_size?: string
          contacted_at?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          job_title?: string
          last_name?: string
          message?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
          use_case?: string
          user_id?: string | null
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          created_at: string
          delay_hours: number | null
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template: string
          trigger_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          delay_hours?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template: string
          trigger_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          delay_hours?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template?: string
          trigger_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          email: string
          error_message: string | null
          id: string
          opened_at: string | null
          sent_at: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          email: string
          error_message?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          email?: string
          error_message?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string | null
          id: string
          ipfs_cid: string
          meta: Json | null
          owner_wallet: string
          pin_status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ipfs_cid: string
          meta?: Json | null
          owner_wallet: string
          pin_status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ipfs_cid?: string
          meta?: Json | null
          owner_wallet?: string
          pin_status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_owner_wallet_fkey"
            columns: ["owner_wallet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      merchant_transactions: {
        Row: {
          amount: number
          blockchain_confirmed: boolean | null
          confirmation_count: number | null
          created_at: string
          currency: string
          customer_wallet: string | null
          id: string
          merchant_id: string
          metadata: Json | null
          network: string
          payment_address: string
          status: string
          transaction_hash: string | null
          updated_at: string
          webhook_url: string | null
        }
        Insert: {
          amount: number
          blockchain_confirmed?: boolean | null
          confirmation_count?: number | null
          created_at?: string
          currency?: string
          customer_wallet?: string | null
          id?: string
          merchant_id: string
          metadata?: Json | null
          network?: string
          payment_address: string
          status?: string
          transaction_hash?: string | null
          updated_at?: string
          webhook_url?: string | null
        }
        Update: {
          amount?: number
          blockchain_confirmed?: boolean | null
          confirmation_count?: number | null
          created_at?: string
          currency?: string
          customer_wallet?: string | null
          id?: string
          merchant_id?: string
          metadata?: Json | null
          network?: string
          payment_address?: string
          status?: string
          transaction_hash?: string | null
          updated_at?: string
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_transactions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      merchants: {
        Row: {
          business_email: string | null
          business_name: string | null
          created_at: string
          id: string
          is_active: boolean | null
          updated_at: string
          user_id: string
          wallet_address: string
        }
        Insert: {
          business_email?: string | null
          business_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id: string
          wallet_address: string
        }
        Update: {
          business_email?: string | null
          business_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string
          wallet_address?: string
        }
        Relationships: []
      }
      nodes: {
        Row: {
          cpu: string | null
          created_at: string | null
          gpu: string | null
          id: string
          location: string | null
          metadata: Json | null
          price_per_hour: number | null
          provider_wallet: string
          reputation: number | null
        }
        Insert: {
          cpu?: string | null
          created_at?: string | null
          gpu?: string | null
          id?: string
          location?: string | null
          metadata?: Json | null
          price_per_hour?: number | null
          provider_wallet: string
          reputation?: number | null
        }
        Update: {
          cpu?: string | null
          created_at?: string | null
          gpu?: string | null
          id?: string
          location?: string | null
          metadata?: Json | null
          price_per_hour?: number | null
          provider_wallet?: string
          reputation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nodes_provider_wallet_fkey"
            columns: ["provider_wallet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      orders: {
        Row: {
          amount_wei: number | null
          buyer_wallet: string
          created_at: string | null
          deadline: string | null
          id: string
          onchain_tx: string | null
          provider_wallet: string
          status: string | null
          submission_cid: string | null
          token_address: string | null
          updated_at: string | null
        }
        Insert: {
          amount_wei?: number | null
          buyer_wallet: string
          created_at?: string | null
          deadline?: string | null
          id?: string
          onchain_tx?: string | null
          provider_wallet: string
          status?: string | null
          submission_cid?: string | null
          token_address?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_wei?: number | null
          buyer_wallet?: string
          created_at?: string | null
          deadline?: string | null
          id?: string
          onchain_tx?: string | null
          provider_wallet?: string
          status?: string | null
          submission_cid?: string | null
          token_address?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_wallet_fkey"
            columns: ["buyer_wallet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
          {
            foreignKeyName: "orders_provider_wallet_fkey"
            columns: ["provider_wallet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      payment_invoices: {
        Row: {
          amount_crypto: number
          amount_usd: number
          created_at: string | null
          crypto_currency: string
          expires_at: string | null
          id: string
          invoice_number: string
          metadata: Json | null
          network: string | null
          paid_at: string | null
          payment_address: string
          qr_code_data: string | null
          status: string | null
          transaction_hash: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_crypto: number
          amount_usd: number
          created_at?: string | null
          crypto_currency?: string
          expires_at?: string | null
          id?: string
          invoice_number: string
          metadata?: Json | null
          network?: string | null
          paid_at?: string | null
          payment_address: string
          qr_code_data?: string | null
          status?: string | null
          transaction_hash?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_crypto?: number
          amount_usd?: number
          created_at?: string | null
          crypto_currency?: string
          expires_at?: string | null
          id?: string
          invoice_number?: string
          metadata?: Json | null
          network?: string | null
          paid_at?: string | null
          payment_address?: string
          qr_code_data?: string | null
          status?: string | null
          transaction_hash?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          chat_flow: Json | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean | null
          settings: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_flow?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          settings?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          chat_flow?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          settings?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      roi_calculations: {
        Row: {
          compliance_costs: number
          created_at: string
          current_infrastructure_cost: number
          development_team_size: number
          id: string
          implementation_cost: number
          monthly_savings: number
          operational_savings: number
          payback_months: number
          time_to_market: number
          total_savings_three_years: number
          transactions_per_month: number
          updated_at: string
          user_id: string | null
          yearly_roi: number
        }
        Insert: {
          compliance_costs: number
          created_at?: string
          current_infrastructure_cost: number
          development_team_size: number
          id?: string
          implementation_cost: number
          monthly_savings: number
          operational_savings: number
          payback_months: number
          time_to_market: number
          total_savings_three_years: number
          transactions_per_month: number
          updated_at?: string
          user_id?: string | null
          yearly_roi: number
        }
        Update: {
          compliance_costs?: number
          created_at?: string
          current_infrastructure_cost?: number
          development_team_size?: number
          id?: string
          implementation_cost?: number
          monthly_savings?: number
          operational_savings?: number
          payback_months?: number
          time_to_market?: number
          total_savings_three_years?: number
          transactions_per_month?: number
          updated_at?: string
          user_id?: string | null
          yearly_roi?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount_crypto: number | null
          amount_usd: number | null
          block_number: number | null
          chain: string | null
          confirmation_count: number | null
          created_at: string | null
          crypto_currency: string | null
          event_type: string | null
          gas_fee: number | null
          id: string
          network: string | null
          order_id: string | null
          raw_event: Json | null
          transaction_status: string | null
          tx_hash: string | null
          updated_at: string | null
          user_id: string | null
          wallet_address: string | null
        }
        Insert: {
          amount_crypto?: number | null
          amount_usd?: number | null
          block_number?: number | null
          chain?: string | null
          confirmation_count?: number | null
          created_at?: string | null
          crypto_currency?: string | null
          event_type?: string | null
          gas_fee?: number | null
          id?: string
          network?: string | null
          order_id?: string | null
          raw_event?: Json | null
          transaction_status?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          user_id?: string | null
          wallet_address?: string | null
        }
        Update: {
          amount_crypto?: number | null
          amount_usd?: number | null
          block_number?: number | null
          chain?: string | null
          confirmation_count?: number | null
          created_at?: string | null
          crypto_currency?: string | null
          event_type?: string | null
          gas_fee?: number | null
          id?: string
          network?: string | null
          order_id?: string | null
          raw_event?: Json | null
          transaction_status?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          user_id?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          amount: number
          billing_cycle: string
          created_at: string
          currency: string
          expires_at: string | null
          id: string
          payment_method: string
          plan_id: string
          plan_name: string
          status: string
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          billing_cycle?: string
          created_at?: string
          currency?: string
          expires_at?: string | null
          id?: string
          payment_method: string
          plan_id: string
          plan_name: string
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          billing_cycle?: string
          created_at?: string
          currency?: string
          expires_at?: string | null
          id?: string
          payment_method?: string
          plan_id?: string
          plan_name?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          meta: Json | null
          role: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          meta?: Json | null
          role?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          meta?: Json | null
          role?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      wallet_connections: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          updated_at: string | null
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          updated_at?: string | null
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          updated_at?: string | null
          user_id?: string
          wallet_address?: string
          wallet_type?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          attempts: number | null
          created_at: string
          id: string
          payload: Json
          response_body: string | null
          response_status: number | null
          success: boolean | null
          transaction_id: string
          webhook_url: string
        }
        Insert: {
          attempts?: number | null
          created_at?: string
          id?: string
          payload: Json
          response_body?: string | null
          response_status?: number | null
          success?: boolean | null
          transaction_id: string
          webhook_url: string
        }
        Update: {
          attempts?: number | null
          created_at?: string
          id?: string
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          success?: boolean | null
          transaction_id?: string
          webhook_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_logs_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "merchant_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_auth: { Args: { wallet: string }; Returns: string }
      generate_challenge: { Args: { wallet: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_work: {
        Args: { cid: string; order_uuid: string; provider: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
