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
      profiles: {
        Row: {
          id: string
          phone: string | null
          portfolio_url: string | null
          linkedin_url: string | null
          cv_url: string | null
          updated_at: string
        }
        Insert: {
          id: string
          phone?: string | null
          portfolio_url?: string | null
          linkedin_url?: string | null
          cv_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          portfolio_url?: string | null
          linkedin_url?: string | null
          cv_url?: string | null
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          user_id: string
          company_name: string
          job_role: string
          contact_person: string | null
          contact_email: string
          requirements: string | null
          email_template: string | null
          status: 'pending' | 'accepted' | 'rejected'
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          job_role: string
          contact_person?: string | null
          contact_email: string
          requirements?: string | null
          email_template?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          job_role?: string
          contact_person?: string | null
          contact_email?: string
          requirements?: string | null
          email_template?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          applied_at?: string
          updated_at?: string
        }
      }
    }
  }
}