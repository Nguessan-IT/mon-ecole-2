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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      acces_ecoles_monecole1: {
        Row: {
          created_at: string | null
          ecole_id: string | null
          id: string
          role: string | null
          super_admin_id: string | null
        }
        Insert: {
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          role?: string | null
          super_admin_id?: string | null
        }
        Update: {
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          role?: string | null
          super_admin_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acces_ecoles_monecole1_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acces_ecoles_monecole1_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "acces_ecoles_monecole1_super_admin_id_fkey"
            columns: ["super_admin_id"]
            isOneToOne: false
            referencedRelation: "super_admins_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      acces_ecoles_monecole2: {
        Row: {
          created_at: string | null
          ecole_id: string | null
          id: string
          role: string | null
          super_admin_id: string | null
        }
        Insert: {
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          role?: string | null
          super_admin_id?: string | null
        }
        Update: {
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          role?: string | null
          super_admin_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acces_ecoles_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acces_ecoles_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acces_ecoles_monecole2_super_admin_id_fkey"
            columns: ["super_admin_id"]
            isOneToOne: false
            referencedRelation: "super_admins_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      affectations_eleves_monecole1: {
        Row: {
          classe_id: string
          created_at: string | null
          created_by_id: string
          eleve_id: string
          id: string
        }
        Insert: {
          classe_id: string
          created_at?: string | null
          created_by_id: string
          eleve_id: string
          id?: string
        }
        Update: {
          classe_id?: string
          created_at?: string | null
          created_by_id?: string
          eleve_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affectations_eleves_classe_id_fkey"
            columns: ["classe_id"]
            isOneToOne: false
            referencedRelation: "classes_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affectations_eleves_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affectations_eleves_eleve_id_fkey"
            columns: ["eleve_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_name: string
          id: string
          professional_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_name: string
          id?: string
          professional_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_name?: string
          id?: string
          professional_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_monecole1: {
        Row: {
          action: string
          created_at: string | null
          ecole_id: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          module: string
          user_agent: string | null
          utilisateur_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          module: string
          user_agent?: string | null
          utilisateur_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          module?: string
          user_agent?: string | null
          utilisateur_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_monecole1_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_monecole1_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "analytics_monecole1_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_monecole2: {
        Row: {
          action: string
          created_at: string | null
          ecole_id: string
          id: string
          ip_address: unknown
          metadata: Json | null
          module: string
          user_agent: string | null
          utilisateur_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          ecole_id: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          module: string
          user_agent?: string | null
          utilisateur_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          ecole_id?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          module?: string
          user_agent?: string | null
          utilisateur_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_monecole2_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_santeconnect: {
        Row: {
          center_id: string | null
          created_at: string
          date_recorded: string
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number
        }
        Insert: {
          center_id?: string | null
          created_at?: string
          date_recorded?: string
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value: number
        }
        Update: {
          center_id?: string | null
          created_at?: string
          date_recorded?: string
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "analytics_santeconnect_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "medical_centers_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      annonces_monecole1: {
        Row: {
          auteur_id: string
          classe_ids: string[] | null
          contenu: string
          created_at: string | null
          destinataires: Database["public"]["Enums"]["user_type"][] | null
          ecole_id: string | null
          expire_at: string | null
          id: string
          titre: string
          updated_at: string | null
          urgent: boolean | null
        }
        Insert: {
          auteur_id: string
          classe_ids?: string[] | null
          contenu: string
          created_at?: string | null
          destinataires?: Database["public"]["Enums"]["user_type"][] | null
          ecole_id?: string | null
          expire_at?: string | null
          id?: string
          titre: string
          updated_at?: string | null
          urgent?: boolean | null
        }
        Update: {
          auteur_id?: string
          classe_ids?: string[] | null
          contenu?: string
          created_at?: string | null
          destinataires?: Database["public"]["Enums"]["user_type"][] | null
          ecole_id?: string | null
          expire_at?: string | null
          id?: string
          titre?: string
          updated_at?: string | null
          urgent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "annonces_auteur_id_fkey"
            columns: ["auteur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annonces_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annonces_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
        ]
      }
      annonces_monecole2: {
        Row: {
          auteur_id: string
          classe_ids: string[] | null
          contenu: string
          created_at: string | null
          destinataires: Database["public"]["Enums"]["user_type"][] | null
          ecole_id: string | null
          expire_at: string | null
          id: string
          titre: string
          updated_at: string | null
          urgent: boolean | null
        }
        Insert: {
          auteur_id: string
          classe_ids?: string[] | null
          contenu: string
          created_at?: string | null
          destinataires?: Database["public"]["Enums"]["user_type"][] | null
          ecole_id?: string | null
          expire_at?: string | null
          id?: string
          titre: string
          updated_at?: string | null
          urgent?: boolean | null
        }
        Update: {
          auteur_id?: string
          classe_ids?: string[] | null
          contenu?: string
          created_at?: string | null
          destinataires?: Database["public"]["Enums"]["user_type"][] | null
          ecole_id?: string | null
          expire_at?: string | null
          id?: string
          titre?: string
          updated_at?: string | null
          urgent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "annonces_monecole2_auteur_id_fkey"
            columns: ["auteur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annonces_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annonces_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments_santeconnect: {
        Row: {
          center_id: string | null
          created_at: string
          date_rdv: string
          duree_minutes: number | null
          id: string
          medecin_id: string | null
          motif: string | null
          notes: string | null
          patient_id: string
          room_id: string | null
          statut: string | null
          type_consultation: string
          updated_at: string
        }
        Insert: {
          center_id?: string | null
          created_at?: string
          date_rdv: string
          duree_minutes?: number | null
          id?: string
          medecin_id?: string | null
          motif?: string | null
          notes?: string | null
          patient_id: string
          room_id?: string | null
          statut?: string | null
          type_consultation: string
          updated_at?: string
        }
        Update: {
          center_id?: string | null
          created_at?: string
          date_rdv?: string
          duree_minutes?: number | null
          id?: string
          medecin_id?: string | null
          motif?: string | null
          notes?: string | null
          patient_id?: string
          room_id?: string | null
          statut?: string | null
          type_consultation?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_santeconnect_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "medical_centers_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_santeconnect_medecin_id_fkey"
            columns: ["medecin_id"]
            isOneToOne: false
            referencedRelation: "profiles_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_santeconnect_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_santeconnect_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_actions_monecole1: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          ecole_id: string | null
          id: string
          ip_address: unknown
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          ecole_id?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          ecole_id?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_actions_monecole1_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_actions_monecole1_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
        ]
      }
      audit_actions_monecole2: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          ecole_id: string | null
          id: string
          ip_address: unknown
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          ecole_id?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          ecole_id?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_actions_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_actions_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      bulletins_monecole1: {
        Row: {
          annee_scolaire: string
          appreciation_generale: string | null
          classe_id: string
          created_at: string | null
          ecole_id: string | null
          eleve_id: string
          id: string
          moyenne_generale: number | null
          periode: string
          rang: number | null
          status: Database["public"]["Enums"]["bulletin_status"] | null
          updated_at: string | null
          validated_by_id: string | null
        }
        Insert: {
          annee_scolaire: string
          appreciation_generale?: string | null
          classe_id: string
          created_at?: string | null
          ecole_id?: string | null
          eleve_id: string
          id?: string
          moyenne_generale?: number | null
          periode: string
          rang?: number | null
          status?: Database["public"]["Enums"]["bulletin_status"] | null
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Update: {
          annee_scolaire?: string
          appreciation_generale?: string | null
          classe_id?: string
          created_at?: string | null
          ecole_id?: string | null
          eleve_id?: string
          id?: string
          moyenne_generale?: number | null
          periode?: string
          rang?: number | null
          status?: Database["public"]["Enums"]["bulletin_status"] | null
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bulletins_classe_id_fkey"
            columns: ["classe_id"]
            isOneToOne: false
            referencedRelation: "classes_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulletins_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulletins_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "bulletins_eleve_id_fkey"
            columns: ["eleve_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulletins_validated_by_id_fkey"
            columns: ["validated_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      bulletins_monecole2: {
        Row: {
          annee_scolaire: string
          appreciation_generale: string | null
          classe_id: string
          created_at: string | null
          ecole_id: string | null
          eleve_id: string
          id: string
          moyenne_generale: number | null
          periode: string
          rang: number | null
          status: Database["public"]["Enums"]["bulletin_status"] | null
          updated_at: string | null
          validated_by_id: string | null
        }
        Insert: {
          annee_scolaire: string
          appreciation_generale?: string | null
          classe_id: string
          created_at?: string | null
          ecole_id?: string | null
          eleve_id: string
          id?: string
          moyenne_generale?: number | null
          periode: string
          rang?: number | null
          status?: Database["public"]["Enums"]["bulletin_status"] | null
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Update: {
          annee_scolaire?: string
          appreciation_generale?: string | null
          classe_id?: string
          created_at?: string | null
          ecole_id?: string | null
          eleve_id?: string
          id?: string
          moyenne_generale?: number | null
          periode?: string
          rang?: number | null
          status?: Database["public"]["Enums"]["bulletin_status"] | null
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bulletins_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulletins_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulletins_monecole2_eleve_id_fkey"
            columns: ["eleve_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulletins_monecole2_validated_by_id_fkey"
            columns: ["validated_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      calendrier_scolaire_monecole2: {
        Row: {
          created_at: string | null
          created_by_id: string
          date_debut: string
          date_fin: string | null
          description: string | null
          ecole_id: string | null
          id: string
          titre: string
          type_evenement: string
        }
        Insert: {
          created_at?: string | null
          created_by_id: string
          date_debut: string
          date_fin?: string | null
          description?: string | null
          ecole_id?: string | null
          id?: string
          titre: string
          type_evenement: string
        }
        Update: {
          created_at?: string | null
          created_by_id?: string
          date_debut?: string
          date_fin?: string | null
          description?: string | null
          ecole_id?: string | null
          id?: string
          titre?: string
          type_evenement?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendrier_scolaire_monecole2_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendrier_scolaire_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendrier_scolaire_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          added_at: string | null
          id: number
          product_id: number
          quantity: number | null
          user_id: string
        }
        Insert: {
          added_at?: string | null
          id?: never
          product_id: number
          quantity?: number | null
          user_id: string
        }
        Update: {
          added_at?: string | null
          id?: never
          product_id?: number
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      classes_monecole1: {
        Row: {
          annee_scolaire: string
          created_at: string | null
          created_by_id: string | null
          ecole_id: string | null
          enseignant_principal_id: string | null
          id: string
          niveau: string
          nom: string
          status: string | null
          submitted_at: string | null
          validated_at: string | null
          validated_by_id: string | null
        }
        Insert: {
          annee_scolaire: string
          created_at?: string | null
          created_by_id?: string | null
          ecole_id?: string | null
          enseignant_principal_id?: string | null
          id?: string
          niveau: string
          nom: string
          status?: string | null
          submitted_at?: string | null
          validated_at?: string | null
          validated_by_id?: string | null
        }
        Update: {
          annee_scolaire?: string
          created_at?: string | null
          created_by_id?: string | null
          ecole_id?: string | null
          enseignant_principal_id?: string | null
          id?: string
          niveau?: string
          nom?: string
          status?: string | null
          submitted_at?: string | null
          validated_at?: string | null
          validated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "classes_enseignant_principal_id_fkey"
            columns: ["enseignant_principal_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_validated_by_id_fkey"
            columns: ["validated_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      classes_monecole2: {
        Row: {
          annee_scolaire: string
          created_at: string | null
          created_by_id: string | null
          ecole_id: string | null
          enseignant_principal_id: string | null
          id: string
          niveau: string
          nom: string
          status: string | null
          submitted_at: string | null
          validated_at: string | null
          validated_by_id: string | null
        }
        Insert: {
          annee_scolaire: string
          created_at?: string | null
          created_by_id?: string | null
          ecole_id?: string | null
          enseignant_principal_id?: string | null
          id?: string
          niveau: string
          nom: string
          status?: string | null
          submitted_at?: string | null
          validated_at?: string | null
          validated_by_id?: string | null
        }
        Update: {
          annee_scolaire?: string
          created_at?: string | null
          created_by_id?: string | null
          ecole_id?: string | null
          enseignant_principal_id?: string | null
          id?: string
          niveau?: string
          nom?: string
          status?: string | null
          submitted_at?: string | null
          validated_at?: string | null
          validated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_monecole2_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_monecole2_enseignant_principal_id_fkey"
            columns: ["enseignant_principal_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_monecole2_validated_by_id_fkey"
            columns: ["validated_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      companies_fact_digit: {
        Row: {
          company_address: string | null
          company_email: string
          company_logo_url: string | null
          company_name: string
          company_phone: string | null
          company_siret: string | null
          created_at: string
          id: string
          subscription_plan: Database["public"]["Enums"]["subscription_plan_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          company_address?: string | null
          company_email: string
          company_logo_url?: string | null
          company_name: string
          company_phone?: string | null
          company_siret?: string | null
          created_at?: string
          id?: string
          subscription_plan?: Database["public"]["Enums"]["subscription_plan_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          company_address?: string | null
          company_email?: string
          company_logo_url?: string | null
          company_name?: string
          company_phone?: string | null
          company_siret?: string | null
          created_at?: string
          id?: string
          subscription_plan?: Database["public"]["Enums"]["subscription_plan_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      course_completions: {
        Row: {
          completed_at: string | null
          id: string
          module_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          module_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          module_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_completions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          enrolled_at: string | null
          id: string
          payment_id: string | null
          progress: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          enrolled_at?: string | null
          id?: string
          payment_id?: string | null
          progress?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string | null
          id?: string
          payment_id?: string | null
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          content_url: string | null
          course_id: string
          created_at: string | null
          duration: string | null
          id: string
          order_index: number
          title: string
          type: string | null
        }
        Insert: {
          content_url?: string | null
          course_id: string
          created_at?: string | null
          duration?: string | null
          id?: string
          order_index?: number
          title: string
          type?: string | null
        }
        Update: {
          content_url?: string | null
          course_id?: string
          created_at?: string | null
          duration?: string | null
          id?: string
          order_index?: number
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          is_active: boolean | null
          level: string | null
          modules_count: number | null
          price: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          level?: string | null
          modules_count?: number | null
          price?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          level?: string | null
          modules_count?: number | null
          price?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      creneaux_emploi_temps_monecole1: {
        Row: {
          created_at: string | null
          emploi_temps_id: string | null
          enseignant_id: string | null
          heure_debut: string
          heure_fin: string
          id: string
          jour_semaine: number
          matiere_id: string | null
          salle: string | null
        }
        Insert: {
          created_at?: string | null
          emploi_temps_id?: string | null
          enseignant_id?: string | null
          heure_debut: string
          heure_fin: string
          id?: string
          jour_semaine: number
          matiere_id?: string | null
          salle?: string | null
        }
        Update: {
          created_at?: string | null
          emploi_temps_id?: string | null
          enseignant_id?: string | null
          heure_debut?: string
          heure_fin?: string
          id?: string
          jour_semaine?: number
          matiere_id?: string | null
          salle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creneaux_emploi_temps_emploi_temps_id_fkey"
            columns: ["emploi_temps_id"]
            isOneToOne: false
            referencedRelation: "emplois_temps_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creneaux_emploi_temps_enseignant_id_fkey"
            columns: ["enseignant_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creneaux_emploi_temps_matiere_id_fkey"
            columns: ["matiere_id"]
            isOneToOne: false
            referencedRelation: "matieres_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      creneaux_emploi_temps_monecole2: {
        Row: {
          created_at: string | null
          emploi_temps_id: string | null
          enseignant_id: string | null
          heure_debut: string
          heure_fin: string
          id: string
          jour_semaine: number
          matiere_id: string | null
          salle: string | null
        }
        Insert: {
          created_at?: string | null
          emploi_temps_id?: string | null
          enseignant_id?: string | null
          heure_debut: string
          heure_fin: string
          id?: string
          jour_semaine: number
          matiere_id?: string | null
          salle?: string | null
        }
        Update: {
          created_at?: string | null
          emploi_temps_id?: string | null
          enseignant_id?: string | null
          heure_debut?: string
          heure_fin?: string
          id?: string
          jour_semaine?: number
          matiere_id?: string | null
          salle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creneaux_emploi_temps_monecole2_emploi_temps_id_fkey"
            columns: ["emploi_temps_id"]
            isOneToOne: false
            referencedRelation: "emplois_temps_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creneaux_emploi_temps_monecole2_enseignant_id_fkey"
            columns: ["enseignant_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creneaux_emploi_temps_monecole2_matiere_id_fkey"
            columns: ["matiere_id"]
            isOneToOne: false
            referencedRelation: "matieres_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      customers_fact_digit: {
        Row: {
          address: string | null
          company_id: string
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          company_id: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          company_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_fact_digit_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit"
            referencedColumns: ["id"]
          },
        ]
      }
      deliveries_santeconnect: {
        Row: {
          adresse_livraison: string
          created_at: string
          date_livraison_effective: string | null
          date_livraison_prevue: string | null
          id: string
          montant_total: number | null
          notes: string | null
          patient_id: string
          pharmacy_id: string
          prescription_id: string
          statut: string | null
          telephone_contact: string
          updated_at: string
        }
        Insert: {
          adresse_livraison: string
          created_at?: string
          date_livraison_effective?: string | null
          date_livraison_prevue?: string | null
          id?: string
          montant_total?: number | null
          notes?: string | null
          patient_id: string
          pharmacy_id: string
          prescription_id: string
          statut?: string | null
          telephone_contact: string
          updated_at?: string
        }
        Update: {
          adresse_livraison?: string
          created_at?: string
          date_livraison_effective?: string | null
          date_livraison_prevue?: string | null
          id?: string
          montant_total?: number | null
          notes?: string | null
          patient_id?: string
          pharmacy_id?: string
          prescription_id?: string
          statut?: string | null
          telephone_contact?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_santeconnect_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_santeconnect_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_santeconnect_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      demandes_permission_monecole1: {
        Row: {
          commentaire_reponse: string | null
          created_at: string | null
          date_debut: string
          date_fin: string | null
          demandeur_id: string
          ecole_id: string | null
          id: string
          motif: string
          status: Database["public"]["Enums"]["permission_status"] | null
          traite_par_id: string | null
          type_demande: string
          updated_at: string | null
        }
        Insert: {
          commentaire_reponse?: string | null
          created_at?: string | null
          date_debut: string
          date_fin?: string | null
          demandeur_id: string
          ecole_id?: string | null
          id?: string
          motif: string
          status?: Database["public"]["Enums"]["permission_status"] | null
          traite_par_id?: string | null
          type_demande: string
          updated_at?: string | null
        }
        Update: {
          commentaire_reponse?: string | null
          created_at?: string | null
          date_debut?: string
          date_fin?: string | null
          demandeur_id?: string
          ecole_id?: string | null
          id?: string
          motif?: string
          status?: Database["public"]["Enums"]["permission_status"] | null
          traite_par_id?: string | null
          type_demande?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demandes_permission_demandeur_id_fkey"
            columns: ["demandeur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_permission_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_permission_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "demandes_permission_traite_par_id_fkey"
            columns: ["traite_par_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      demandes_permission_monecole2: {
        Row: {
          commentaire_reponse: string | null
          created_at: string | null
          date_debut: string
          date_fin: string | null
          demandeur_id: string
          ecole_id: string | null
          id: string
          motif: string
          status: Database["public"]["Enums"]["permission_status"] | null
          traite_par_id: string | null
          type_demande: string
          updated_at: string | null
        }
        Insert: {
          commentaire_reponse?: string | null
          created_at?: string | null
          date_debut: string
          date_fin?: string | null
          demandeur_id: string
          ecole_id?: string | null
          id?: string
          motif: string
          status?: Database["public"]["Enums"]["permission_status"] | null
          traite_par_id?: string | null
          type_demande: string
          updated_at?: string | null
        }
        Update: {
          commentaire_reponse?: string | null
          created_at?: string | null
          date_debut?: string
          date_fin?: string | null
          demandeur_id?: string
          ecole_id?: string | null
          id?: string
          motif?: string
          status?: Database["public"]["Enums"]["permission_status"] | null
          traite_par_id?: string | null
          type_demande?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demandes_permission_monecole2_demandeur_id_fkey"
            columns: ["demandeur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_permission_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_permission_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_permission_monecole2_traite_par_id_fkey"
            columns: ["traite_par_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      devoirs_monecole1: {
        Row: {
          classe_id: string
          created_at: string | null
          date_limite: string
          description: string | null
          ecole_id: string | null
          enseignant_id: string
          fichier_url: string | null
          id: string
          matiere_id: string
          titre: string
          updated_at: string | null
        }
        Insert: {
          classe_id: string
          created_at?: string | null
          date_limite: string
          description?: string | null
          ecole_id?: string | null
          enseignant_id: string
          fichier_url?: string | null
          id?: string
          matiere_id: string
          titre: string
          updated_at?: string | null
        }
        Update: {
          classe_id?: string
          created_at?: string | null
          date_limite?: string
          description?: string | null
          ecole_id?: string | null
          enseignant_id?: string
          fichier_url?: string | null
          id?: string
          matiere_id?: string
          titre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devoirs_classe_id_fkey"
            columns: ["classe_id"]
            isOneToOne: false
            referencedRelation: "classes_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devoirs_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devoirs_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "devoirs_enseignant_id_fkey"
            columns: ["enseignant_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devoirs_matiere_id_fkey"
            columns: ["matiere_id"]
            isOneToOne: false
            referencedRelation: "matieres_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      documents_docpro: {
        Row: {
          content_text: string | null
          created_at: string | null
          fields_json: Json | null
          id: string
          paid: boolean | null
          template_id: string | null
          user_id: string
        }
        Insert: {
          content_text?: string | null
          created_at?: string | null
          fields_json?: Json | null
          id?: string
          paid?: boolean | null
          template_id?: string | null
          user_id: string
        }
        Update: {
          content_text?: string | null
          created_at?: string | null
          fields_json?: Json | null
          id?: string
          paid?: boolean | null
          template_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_docpro_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates_docpro"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_docpro_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_docpro"
            referencedColumns: ["id"]
          },
        ]
      }
      documents_importes_monecole2: {
        Row: {
          chemin_storage: string
          created_at: string | null
          ecole_id: string | null
          id: string
          importe_par: string | null
          metadata: Json | null
          nom_fichier: string
          statut: string | null
          type_document: string
          updated_at: string | null
        }
        Insert: {
          chemin_storage: string
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          importe_par?: string | null
          metadata?: Json | null
          nom_fichier: string
          statut?: string | null
          type_document: string
          updated_at?: string | null
        }
        Update: {
          chemin_storage?: string
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          importe_par?: string | null
          metadata?: Json | null
          nom_fichier?: string
          statut?: string | null
          type_document?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_importes_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_importes_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_importes_monecole2_importe_par_fkey"
            columns: ["importe_par"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      dossiers_medicaux_santeconnect: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          document_name: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          document_url: string
          id: string
          patient_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          document_name?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          document_url: string
          id?: string
          patient_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          document_name?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          document_url?: string
          id?: string
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dossiers_medicaux_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      ecoles_monecole1: {
        Row: {
          adresse: string | null
          created_at: string | null
          email: string | null
          id: string
          nom: string
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nom: string
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          adresse?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nom?: string
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ecoles_monecole2: {
        Row: {
          adresse: string | null
          code_unique: string | null
          configuration_paiement: Json | null
          created_at: string | null
          email: string | null
          footer: string | null
          header: string | null
          id: string
          limites_utilisateurs: number | null
          logo_url: string | null
          nom: string
          paystack_public_key: string | null
          paystack_secret_key: string | null
          plan_subscription: string | null
          slogan: string | null
          statut: string | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          adresse?: string | null
          code_unique?: string | null
          configuration_paiement?: Json | null
          created_at?: string | null
          email?: string | null
          footer?: string | null
          header?: string | null
          id?: string
          limites_utilisateurs?: number | null
          logo_url?: string | null
          nom: string
          paystack_public_key?: string | null
          paystack_secret_key?: string | null
          plan_subscription?: string | null
          slogan?: string | null
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          adresse?: string | null
          code_unique?: string | null
          configuration_paiement?: Json | null
          created_at?: string | null
          email?: string | null
          footer?: string | null
          header?: string | null
          id?: string
          limites_utilisateurs?: number | null
          logo_url?: string | null
          nom?: string
          paystack_public_key?: string | null
          paystack_secret_key?: string | null
          plan_subscription?: string | null
          slogan?: string | null
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      emplois_temps_monecole1: {
        Row: {
          classe_id: string | null
          created_at: string | null
          created_by_id: string
          ecole_id: string | null
          id: string
          semaine_debut: string
          semaine_fin: string
          status: Database["public"]["Enums"]["emploi_temps_status"] | null
          titre: string
          updated_at: string | null
          validated_by_id: string | null
        }
        Insert: {
          classe_id?: string | null
          created_at?: string | null
          created_by_id: string
          ecole_id?: string | null
          id?: string
          semaine_debut: string
          semaine_fin: string
          status?: Database["public"]["Enums"]["emploi_temps_status"] | null
          titre: string
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Update: {
          classe_id?: string | null
          created_at?: string | null
          created_by_id?: string
          ecole_id?: string | null
          id?: string
          semaine_debut?: string
          semaine_fin?: string
          status?: Database["public"]["Enums"]["emploi_temps_status"] | null
          titre?: string
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emplois_temps_classe_id_fkey"
            columns: ["classe_id"]
            isOneToOne: false
            referencedRelation: "classes_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emplois_temps_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emplois_temps_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emplois_temps_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "emplois_temps_validated_by_id_fkey"
            columns: ["validated_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      emplois_temps_monecole2: {
        Row: {
          classe_id: string | null
          created_at: string | null
          created_by_id: string
          ecole_id: string | null
          id: string
          semaine_debut: string
          semaine_fin: string
          status: Database["public"]["Enums"]["emploi_temps_status"] | null
          titre: string
          updated_at: string | null
          validated_by_id: string | null
        }
        Insert: {
          classe_id?: string | null
          created_at?: string | null
          created_by_id: string
          ecole_id?: string | null
          id?: string
          semaine_debut: string
          semaine_fin: string
          status?: Database["public"]["Enums"]["emploi_temps_status"] | null
          titre: string
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Update: {
          classe_id?: string | null
          created_at?: string | null
          created_by_id?: string
          ecole_id?: string | null
          id?: string
          semaine_debut?: string
          semaine_fin?: string
          status?: Database["public"]["Enums"]["emploi_temps_status"] | null
          titre?: string
          updated_at?: string | null
          validated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emplois_temps_monecole2_classe_id_fkey"
            columns: ["classe_id"]
            isOneToOne: false
            referencedRelation: "classes_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emplois_temps_monecole2_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emplois_temps_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emplois_temps_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emplois_temps_monecole2_validated_by_id_fkey"
            columns: ["validated_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          professional_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          professional_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          professional_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items_fact_digit: {
        Row: {
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_fact_digit_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices_fact_digit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices_fact_digit"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices_fact_digit: {
        Row: {
          company_id: string
          created_at: string
          customer_id: string
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          status: string
          subtotal: number
          tax_amount: number
          tax_rate: number
          total_amount: number
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          customer_id: string
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total_amount?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          customer_id?: string
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_fact_digit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_fact_digit_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_fact_digit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_fact_digit_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_fact_digit"
            referencedColumns: ["id"]
          },
        ]
      }
      matieres_monecole1: {
        Row: {
          code: string
          coefficient: number | null
          created_at: string | null
          ecole_id: string | null
          id: string
          nom: string
        }
        Insert: {
          code: string
          coefficient?: number | null
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          nom: string
        }
        Update: {
          code?: string
          coefficient?: number | null
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "matieres_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matieres_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
        ]
      }
      matieres_monecole2: {
        Row: {
          code: string
          coefficient: number | null
          created_at: string | null
          ecole_id: string | null
          id: string
          nom: string
        }
        Insert: {
          code: string
          coefficient?: number | null
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          nom: string
        }
        Update: {
          code?: string
          coefficient?: number | null
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "matieres_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matieres_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_centers_santeconnect: {
        Row: {
          adresse: string | null
          created_at: string
          email: string | null
          horaires_ouverture: Json | null
          id: string
          nom: string
          specialites: string[] | null
          telephone: string | null
          updated_at: string
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          horaires_ouverture?: Json | null
          id?: string
          nom: string
          specialites?: string[] | null
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          horaires_ouverture?: Json | null
          id?: string
          nom?: string
          specialites?: string[] | null
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      medication_stock_santeconnect: {
        Row: {
          created_at: string
          date_expiration: string | null
          dosage: string | null
          forme: string | null
          id: string
          nom_medicament: string
          pharmacy_id: string
          prescription_requise: boolean | null
          prix_unitaire: number | null
          quantite_disponible: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_expiration?: string | null
          dosage?: string | null
          forme?: string | null
          id?: string
          nom_medicament: string
          pharmacy_id: string
          prescription_requise?: boolean | null
          prix_unitaire?: number | null
          quantite_disponible?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_expiration?: string | null
          dosage?: string | null
          forme?: string | null
          id?: string
          nom_medicament?: string
          pharmacy_id?: string
          prescription_requise?: boolean | null
          prix_unitaire?: number | null
          quantite_disponible?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_stock_santeconnect_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          professional_id: string | null
          read: boolean | null
          receiver_id: string | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          professional_id?: string | null
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          professional_id?: string | null
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_santeconnect: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          patient_id: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          patient_id?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          patient_id?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_santeconnect_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_santeconnect_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_santeconnect_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      notes_monecole1: {
        Row: {
          appreciation: string | null
          bulletin_id: string | null
          coefficient: number | null
          created_at: string | null
          date_evaluation: string | null
          enseignant_id: string
          id: string
          matiere_id: string
          note: number | null
          type_evaluation: string
        }
        Insert: {
          appreciation?: string | null
          bulletin_id?: string | null
          coefficient?: number | null
          created_at?: string | null
          date_evaluation?: string | null
          enseignant_id: string
          id?: string
          matiere_id: string
          note?: number | null
          type_evaluation: string
        }
        Update: {
          appreciation?: string | null
          bulletin_id?: string | null
          coefficient?: number | null
          created_at?: string | null
          date_evaluation?: string | null
          enseignant_id?: string
          id?: string
          matiere_id?: string
          note?: number | null
          type_evaluation?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_bulletin_id_fkey"
            columns: ["bulletin_id"]
            isOneToOne: false
            referencedRelation: "bulletins_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_enseignant_id_fkey"
            columns: ["enseignant_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_matiere_id_fkey"
            columns: ["matiere_id"]
            isOneToOne: false
            referencedRelation: "matieres_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      notes_monecole2: {
        Row: {
          appreciation: string | null
          bulletin_id: string | null
          coefficient: number | null
          created_at: string | null
          date_evaluation: string | null
          enseignant_id: string
          id: string
          matiere_id: string
          note: number | null
          type_evaluation: string
        }
        Insert: {
          appreciation?: string | null
          bulletin_id?: string | null
          coefficient?: number | null
          created_at?: string | null
          date_evaluation?: string | null
          enseignant_id: string
          id?: string
          matiere_id: string
          note?: number | null
          type_evaluation: string
        }
        Update: {
          appreciation?: string | null
          bulletin_id?: string | null
          coefficient?: number | null
          created_at?: string | null
          date_evaluation?: string | null
          enseignant_id?: string
          id?: string
          matiere_id?: string
          note?: number | null
          type_evaluation?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_monecole2_bulletin_id_fkey"
            columns: ["bulletin_id"]
            isOneToOne: false
            referencedRelation: "bulletins_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_monecole2_enseignant_id_fkey"
            columns: ["enseignant_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_monecole2_matiere_id_fkey"
            columns: ["matiere_id"]
            isOneToOne: false
            referencedRelation: "matieres_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          data: Json | null
          id: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications_monecole2: {
        Row: {
          created_at: string | null
          destinataire_id: string
          ecole_id: string
          email_envoye: boolean | null
          id: string
          lu: boolean | null
          lu_at: string | null
          message: string
          metadata: Json | null
          push_envoye: boolean | null
          titre: string
          type_notification: string
        }
        Insert: {
          created_at?: string | null
          destinataire_id: string
          ecole_id: string
          email_envoye?: boolean | null
          id?: string
          lu?: boolean | null
          lu_at?: string | null
          message: string
          metadata?: Json | null
          push_envoye?: boolean | null
          titre: string
          type_notification: string
        }
        Update: {
          created_at?: string | null
          destinataire_id?: string
          ecole_id?: string
          email_envoye?: boolean | null
          id?: string
          lu?: boolean | null
          lu_at?: string | null
          message?: string
          metadata?: Json | null
          push_envoye?: boolean | null
          titre?: string
          type_notification?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_monecole2_destinataire_id_fkey"
            columns: ["destinataire_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          price: number
          product_id: number
          quantity: number
        }
        Insert: {
          id?: never
          order_id: number
          price: number
          product_id: number
          quantity: number
        }
        Update: {
          id?: never
          order_id?: number
          price?: number
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: number
          shipping_address: string | null
          status: string | null
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          shipping_address?: string | null
          status?: string | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          shipping_address?: string | null
          status?: string | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      patients_santeconnect: {
        Row: {
          allergies: string[] | null
          antecedents_medicaux: string | null
          contact_urgence_nom: string | null
          contact_urgence_telephone: string | null
          created_at: string
          groupe_sanguin: string | null
          id: string
          numero_securite_sociale: string | null
          telephone: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          allergies?: string[] | null
          antecedents_medicaux?: string | null
          contact_urgence_nom?: string | null
          contact_urgence_telephone?: string | null
          created_at?: string
          groupe_sanguin?: string | null
          id?: string
          numero_securite_sociale?: string | null
          telephone: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          allergies?: string[] | null
          antecedents_medicaux?: string | null
          contact_urgence_nom?: string | null
          contact_urgence_telephone?: string | null
          created_at?: string
          groupe_sanguin?: string | null
          id?: string
          numero_securite_sociale?: string | null
          telephone?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          metadata: Json | null
          payment_method: string
          professional_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          subscription_id: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          payment_method: string
          professional_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          subscription_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string
          professional_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          subscription_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments_fact_digit: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          invoice_id: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_fact_digit_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices_fact_digit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices_fact_digit"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_documents_santeconnect: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          document_name: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          document_url: string
          id: string
          linked_to_account: boolean | null
          patient_id: string | null
          telephone: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          document_name?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          document_url: string
          id?: string
          linked_to_account?: boolean | null
          patient_id?: string | null
          telephone: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          document_name?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          document_url?: string
          id?: string
          linked_to_account?: boolean | null
          patient_id?: string | null
          telephone?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_school_admins: {
        Row: {
          admin_email: string
          admin_nom: string
          admin_prenom: string
          admin_telephone: string | null
          created_at: string | null
          ecole_id: string | null
          id: string
          processed: boolean | null
          processed_at: string | null
          subscription_reference: string
        }
        Insert: {
          admin_email: string
          admin_nom: string
          admin_prenom: string
          admin_telephone?: string | null
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          subscription_reference: string
        }
        Update: {
          admin_email?: string
          admin_nom?: string
          admin_prenom?: string
          admin_telephone?: string | null
          created_at?: string | null
          ecole_id?: string | null
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          subscription_reference?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_school_admins_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: true
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_school_admins_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: true
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      personnalisation_ecoles_monecole2: {
        Row: {
          couleur_accent: string | null
          couleur_primaire: string | null
          couleur_secondaire: string | null
          created_at: string | null
          ecole_id: string
          favicon_url: string | null
          id: string
          logo_url: string | null
          nom_domaine: string | null
          updated_at: string | null
        }
        Insert: {
          couleur_accent?: string | null
          couleur_primaire?: string | null
          couleur_secondaire?: string | null
          created_at?: string | null
          ecole_id: string
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          nom_domaine?: string | null
          updated_at?: string | null
        }
        Update: {
          couleur_accent?: string | null
          couleur_primaire?: string | null
          couleur_secondaire?: string | null
          created_at?: string | null
          ecole_id?: string
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          nom_domaine?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "personnalisation_ecoles_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: true
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personnalisation_ecoles_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: true
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacies: {
        Row: {
          adresse: string
          created_at: string
          email: string | null
          horaires: Json | null
          id: string
          localisation: unknown
          nom: string
          telephone: string | null
          updated_at: string
        }
        Insert: {
          adresse: string
          created_at?: string
          email?: string | null
          horaires?: Json | null
          id?: string
          localisation?: unknown
          nom: string
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          adresse?: string
          created_at?: string
          email?: string | null
          horaires?: Json | null
          id?: string
          localisation?: unknown
          nom?: string
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pharmacies_santeconnect: {
        Row: {
          adresse: string | null
          created_at: string
          email: string | null
          horaires: Json | null
          id: string
          livraison_disponible: boolean | null
          nom: string
          telephone: string | null
          updated_at: string
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          horaires?: Json | null
          id?: string
          livraison_disponible?: boolean | null
          nom: string
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          adresse?: string | null
          created_at?: string
          email?: string | null
          horaires?: Json | null
          id?: string
          livraison_disponible?: boolean | null
          nom?: string
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      prescriptions_santeconnect: {
        Row: {
          created_at: string
          date_livraison: string | null
          date_preparation: string | null
          document_url: string | null
          duree_traitement: string | null
          id: string
          medecin_id: string
          medicaments: Json
          patient_id: string
          pharmacy_id: string | null
          posologie: string | null
          rendez_vous_id: string | null
          statut: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_livraison?: string | null
          date_preparation?: string | null
          document_url?: string | null
          duree_traitement?: string | null
          id?: string
          medecin_id: string
          medicaments: Json
          patient_id: string
          pharmacy_id?: string | null
          posologie?: string | null
          rendez_vous_id?: string | null
          statut?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_livraison?: string | null
          date_preparation?: string | null
          document_url?: string | null
          duree_traitement?: string | null
          id?: string
          medecin_id?: string
          medicaments?: Json
          patient_id?: string
          pharmacy_id?: string | null
          posologie?: string | null
          rendez_vous_id?: string | null
          statut?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_rendez_vous_id_fkey"
            columns: ["rendez_vous_id"]
            isOneToOne: false
            referencedRelation: "rendez_vous"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_santeconnect_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          stock: number | null
          subcategory_id: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: never
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          stock?: number | null
          subcategory_id?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: never
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          stock?: number | null
          subcategory_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          address: string | null
          boost_end_date: string | null
          business_name: string | null
          category: string
          city: string | null
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          is_boosted: boolean | null
          lat: number
          lng: number
          photos: string[] | null
          price_range: string | null
          rating_avg: number | null
          rating_count: number | null
          subcategory: string | null
          subscription_end_date: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status: string | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          boost_end_date?: string | null
          business_name?: string | null
          category: string
          city?: string | null
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_boosted?: boolean | null
          lat: number
          lng: number
          photos?: string[] | null
          price_range?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          subcategory?: string | null
          subscription_end_date?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          boost_end_date?: string | null
          business_name?: string | null
          category?: string
          city?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_boosted?: boolean | null
          lat?: number
          lng?: number
          photos?: string[] | null
          price_range?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          subcategory?: string | null
          subscription_end_date?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "professionals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_santeconnect: {
        Row: {
          adresse: string | null
          created_at: string
          date_naissance: string | null
          genre: string | null
          id: string
          nom: string | null
          prenom: string | null
          telephone: string
          updated_at: string
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          date_naissance?: string | null
          genre?: string | null
          id: string
          nom?: string | null
          prenom?: string | null
          telephone: string
          updated_at?: string
        }
        Update: {
          adresse?: string | null
          created_at?: string
          date_naissance?: string | null
          genre?: string | null
          id?: string
          nom?: string | null
          prenom?: string | null
          telephone?: string
          updated_at?: string
        }
        Relationships: []
      }
      recus_monecole1: {
        Row: {
          created_at: string | null
          created_by_id: string
          date_echeance: string | null
          date_paiement: string | null
          description: string | null
          ecole_id: string | null
          eleve_id: string
          id: string
          mode_paiement: string | null
          montant: number
          numero_recu: string
          paye: boolean | null
          type_recu: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_id: string
          date_echeance?: string | null
          date_paiement?: string | null
          description?: string | null
          ecole_id?: string | null
          eleve_id: string
          id?: string
          mode_paiement?: string | null
          montant: number
          numero_recu: string
          paye?: boolean | null
          type_recu: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: string
          date_echeance?: string | null
          date_paiement?: string | null
          description?: string | null
          ecole_id?: string | null
          eleve_id?: string
          id?: string
          mode_paiement?: string | null
          montant?: number
          numero_recu?: string
          paye?: boolean | null
          type_recu?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recus_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recus_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recus_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
          {
            foreignKeyName: "recus_eleve_id_fkey"
            columns: ["eleve_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      recus_monecole2: {
        Row: {
          created_at: string | null
          created_by_id: string
          date_echeance: string | null
          date_paiement: string | null
          description: string | null
          ecole_id: string | null
          eleve_id: string
          id: string
          mode_paiement: string | null
          montant: number
          numero_recu: string
          paye: boolean | null
          type_recu: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_id: string
          date_echeance?: string | null
          date_paiement?: string | null
          description?: string | null
          ecole_id?: string | null
          eleve_id: string
          id?: string
          mode_paiement?: string | null
          montant: number
          numero_recu: string
          paye?: boolean | null
          type_recu: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: string
          date_echeance?: string | null
          date_paiement?: string | null
          description?: string | null
          ecole_id?: string | null
          eleve_id?: string
          id?: string
          mode_paiement?: string | null
          montant?: number
          numero_recu?: string
          paye?: boolean | null
          type_recu?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recus_monecole2_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recus_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recus_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recus_monecole2_eleve_id_fkey"
            columns: ["eleve_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole2"
            referencedColumns: ["id"]
          },
        ]
      }
      rendez_vous: {
        Row: {
          created_at: string
          date_heure: string
          duree_minutes: number | null
          id: string
          medecin_id: string
          motif: string
          notes: string | null
          patient_id: string
          salle: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_heure: string
          duree_minutes?: number | null
          id?: string
          medecin_id: string
          motif: string
          notes?: string | null
          patient_id: string
          salle?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_heure?: string
          duree_minutes?: number | null
          id?: string
          medecin_id?: string
          motif?: string
          notes?: string | null
          patient_id?: string
          salle?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rendez_vous_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          professional_id: string | null
          reason: string
          reporter_user_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          professional_id?: string | null
          reason: string
          reporter_user_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          professional_id?: string | null
          reason?: string
          reporter_user_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_user_id_fkey"
            columns: ["reporter_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          professional_id: string | null
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          professional_id?: string | null
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          professional_id?: string | null
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms_santeconnect: {
        Row: {
          capacite: number | null
          center_id: string | null
          created_at: string
          disponible: boolean | null
          equipements: string[] | null
          id: string
          nom: string
          type: string | null
        }
        Insert: {
          capacite?: number | null
          center_id?: string | null
          created_at?: string
          disponible?: boolean | null
          equipements?: string[] | null
          id?: string
          nom: string
          type?: string | null
        }
        Update: {
          capacite?: number | null
          center_id?: string | null
          created_at?: string
          disponible?: boolean | null
          equipements?: string[] | null
          id?: string
          nom?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_santeconnect_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "medical_centers_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      school_subscriptions_monecole2: {
        Row: {
          amount: number
          created_at: string | null
          ecole_id: string | null
          end_date: string
          id: string
          paystack_reference: string | null
          plan_type: string
          start_date: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          ecole_id?: string | null
          end_date: string
          id?: string
          paystack_reference?: string | null
          plan_type: string
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          ecole_id?: string | null
          end_date?: string
          id?: string
          paystack_reference?: string | null
          plan_type?: string
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_subscriptions_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_subscriptions_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
      soumissions_devoirs_monecole1: {
        Row: {
          commentaire: string | null
          correction: string | null
          corrige_at: string | null
          corrige_par_id: string | null
          devoir_id: string | null
          eleve_id: string
          fichier_url: string | null
          id: string
          note: number | null
          soumis_at: string | null
        }
        Insert: {
          commentaire?: string | null
          correction?: string | null
          corrige_at?: string | null
          corrige_par_id?: string | null
          devoir_id?: string | null
          eleve_id: string
          fichier_url?: string | null
          id?: string
          note?: number | null
          soumis_at?: string | null
        }
        Update: {
          commentaire?: string | null
          correction?: string | null
          corrige_at?: string | null
          corrige_par_id?: string | null
          devoir_id?: string | null
          eleve_id?: string
          fichier_url?: string | null
          id?: string
          note?: number | null
          soumis_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "soumissions_devoirs_corrige_par_id_fkey"
            columns: ["corrige_par_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "soumissions_devoirs_devoir_id_fkey"
            columns: ["devoir_id"]
            isOneToOne: false
            referencedRelation: "devoirs_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "soumissions_devoirs_eleve_id_fkey"
            columns: ["eleve_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs_ecole_monecole1"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategories: {
        Row: {
          category_id: number
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          category_id: number
          created_at?: string | null
          description?: string | null
          id?: never
          name: string
        }
        Update: {
          category_id?: number
          created_at?: string | null
          description?: string | null
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string | null
          end_date: string
          id: string
          plan: Database["public"]["Enums"]["subscription_plan"]
          professional_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["subscription_status_type"] | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          end_date: string
          id?: string
          plan: Database["public"]["Enums"]["subscription_plan"]
          professional_id?: string | null
          start_date?: string | null
          status?:
            | Database["public"]["Enums"]["subscription_status_type"]
            | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          end_date?: string
          id?: string
          plan?: Database["public"]["Enums"]["subscription_plan"]
          professional_id?: string | null
          start_date?: string | null
          status?:
            | Database["public"]["Enums"]["subscription_status_type"]
            | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals_public"
            referencedColumns: ["id"]
          },
        ]
      }
      super_admins_monecole1: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          id: string
          nom: string
          prenom: string
          telephone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          nom: string
          prenom: string
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          nom?: string
          prenom?: string
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      super_admins_monecole2: {
        Row: {
          created_at: string | null
          email: string
          id: string
          nom: string
          prenom: string
          telephone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          nom: string
          prenom: string
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          nom?: string
          prenom?: string
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      teleconsultations_santeconnect: {
        Row: {
          appointment_id: string | null
          created_at: string
          duration_minutes: number | null
          ended_at: string | null
          id: string
          recording_url: string | null
          room_url: string | null
          started_at: string | null
          statut: string | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          recording_url?: string | null
          room_url?: string | null
          started_at?: string | null
          statut?: string | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          recording_url?: string | null
          room_url?: string | null
          started_at?: string | null
          statut?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teleconsultations_santeconnect_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      templates_docpro: {
        Row: {
          created_at: string | null
          description: string | null
          fields_schema: Json | null
          id: string
          name: string
          prompt_template: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          fields_schema?: Json | null
          id?: string
          name: string
          prompt_template?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          fields_schema?: Json | null
          id?: string
          name?: string
          prompt_template?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          created_at: string
          description: string | null
          devise: string | null
          id: string
          metadata: Json | null
          montant: number
          patient_id: string
          reference_externe: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          type_paiement: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          devise?: string | null
          id?: string
          metadata?: Json | null
          montant: number
          patient_id: string
          reference_externe?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          type_paiement: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          devise?: string | null
          id?: string
          metadata?: Json | null
          montant?: number
          patient_id?: string
          reference_externe?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          type_paiement?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions_docpro: {
        Row: {
          amount: number
          created_at: string | null
          doc_id: string | null
          id: string
          payment_type: string | null
          provider: string | null
          status: string | null
          transaction_ref: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          doc_id?: string | null
          id?: string
          payment_type?: string | null
          provider?: string | null
          status?: string | null
          transaction_ref?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          doc_id?: string | null
          id?: string
          payment_type?: string | null
          provider?: string | null
          status?: string | null
          transaction_ref?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_docpro_doc_id_fkey"
            columns: ["doc_id"]
            isOneToOne: false
            referencedRelation: "documents_docpro"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_docpro_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_docpro"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions_santeconnect: {
        Row: {
          consultation_id: string | null
          created_at: string
          description: string | null
          devise: string
          id: string
          metadata: Json | null
          methode_paiement: string
          montant: number
          patient_id: string
          prescription_id: string | null
          reference_externe: string | null
          statut: string
          type_transaction: string
          updated_at: string
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string
          description?: string | null
          devise?: string
          id?: string
          metadata?: Json | null
          methode_paiement: string
          montant: number
          patient_id: string
          prescription_id?: string | null
          reference_externe?: string | null
          statut?: string
          type_transaction: string
          updated_at?: string
        }
        Update: {
          consultation_id?: string | null
          created_at?: string
          description?: string | null
          devise?: string
          id?: string
          metadata?: Json | null
          methode_paiement?: string
          montant?: number
          patient_id?: string
          prescription_id?: string | null
          reference_externe?: string | null
          statut?: string
          type_transaction?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_santeconnect_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_santeconnect"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles_bibliosci_fact_digit: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          subscription_plan: string
          updated_at: string
          user_id: string
          user_status: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          subscription_plan?: string
          updated_at?: string
          user_id: string
          user_status?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          subscription_plan?: string
          updated_at?: string
          user_id?: string
          user_status?: string
        }
        Relationships: []
      }
      user_profiles_fact_digit: {
        Row: {
          company_email: string | null
          company_name: string
          created_at: string
          id: string
          subscription_plan: Database["public"]["Enums"]["subscription_plan_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          company_email?: string | null
          company_name?: string
          created_at?: string
          id?: string
          subscription_plan?: Database["public"]["Enums"]["subscription_plan_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          company_email?: string | null
          company_name?: string
          created_at?: string
          id?: string
          subscription_plan?: Database["public"]["Enums"]["subscription_plan_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles_santeconnect: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          push_token: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          push_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          push_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users_docpro: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          subscription_active: boolean | null
          subscription_expiry: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          subscription_active?: boolean | null
          subscription_expiry?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          subscription_active?: boolean | null
          subscription_expiry?: string | null
          user_id?: string
        }
        Relationships: []
      }
      utilisateurs_ecole_monecole1: {
        Row: {
          active: boolean | null
          classe: string | null
          created_at: string | null
          ecole_id: string | null
          email: string
          id: string
          matiere: string | null
          nom: string
          numero_etudiant: string | null
          prenom: string
          telephone: string | null
          type_utilisateur: Database["public"]["Enums"]["user_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          classe?: string | null
          created_at?: string | null
          ecole_id?: string | null
          email: string
          id?: string
          matiere?: string | null
          nom: string
          numero_etudiant?: string | null
          prenom: string
          telephone?: string | null
          type_utilisateur: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          classe?: string | null
          created_at?: string | null
          ecole_id?: string | null
          email?: string
          id?: string
          matiere?: string | null
          nom?: string
          numero_etudiant?: string | null
          prenom?: string
          telephone?: string | null
          type_utilisateur?: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "utilisateurs_ecole_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "utilisateurs_ecole_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "school_statistics_monecole1"
            referencedColumns: ["ecole_id"]
          },
        ]
      }
      utilisateurs_ecole_monecole2: {
        Row: {
          active: boolean | null
          classe: string | null
          created_at: string | null
          ecole_id: string | null
          email: string
          id: string
          matiere: string | null
          nom: string
          numero_etudiant: string | null
          pays: string | null
          prenom: string
          telephone: string | null
          type_utilisateur: Database["public"]["Enums"]["user_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          classe?: string | null
          created_at?: string | null
          ecole_id?: string | null
          email: string
          id?: string
          matiere?: string | null
          nom: string
          numero_etudiant?: string | null
          pays?: string | null
          prenom: string
          telephone?: string | null
          type_utilisateur: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          classe?: string | null
          created_at?: string | null
          ecole_id?: string | null
          email?: string
          id?: string
          matiere?: string | null
          nom?: string
          numero_etudiant?: string | null
          pays?: string | null
          prenom?: string
          telephone?: string | null
          type_utilisateur?: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "utilisateurs_ecole_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "utilisateurs_ecole_monecole2_ecole_id_fkey"
            columns: ["ecole_id"]
            isOneToOne: false
            referencedRelation: "ecoles_monecole2_public"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      ecoles_monecole2_public: {
        Row: {
          adresse: string | null
          code_unique: string | null
          created_at: string | null
          email: string | null
          id: string | null
          logo_url: string | null
          nom: string | null
          plan_subscription: string | null
          slogan: string | null
          statut: string | null
          telephone: string | null
        }
        Insert: {
          adresse?: string | null
          code_unique?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          logo_url?: string | null
          nom?: string | null
          plan_subscription?: string | null
          slogan?: string | null
          statut?: string | null
          telephone?: string | null
        }
        Update: {
          adresse?: string | null
          code_unique?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          logo_url?: string | null
          nom?: string | null
          plan_subscription?: string | null
          slogan?: string | null
          statut?: string | null
          telephone?: string | null
        }
        Relationships: []
      }
      professionals_public: {
        Row: {
          address: string | null
          business_name: string | null
          category: string | null
          city: string | null
          created_at: string | null
          description: string | null
          display_name: string | null
          id: string | null
          is_boosted: boolean | null
          lat: number | null
          lng: number | null
          photos: string[] | null
          price_range: string | null
          rating_avg: number | null
          rating_count: number | null
          subcategory: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          id?: string | null
          is_boosted?: boolean | null
          lat?: number | null
          lng?: number | null
          photos?: string[] | null
          price_range?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          subcategory?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          id?: string | null
          is_boosted?: boolean | null
          lat?: number | null
          lng?: number | null
          photos?: string[] | null
          price_range?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          subcategory?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      school_statistics_monecole1: {
        Row: {
          ecole_id: string | null
          ecole_nom: string | null
          montant_total_paye: number | null
          nb_eleves: number | null
          nb_enseignants: number | null
          nb_recus_payes: number | null
          nb_recus_total: number | null
          nb_utilisateurs: number | null
        }
        Relationships: []
      }
      super_admin_dashboard: {
        Row: {
          active_subscriptions: number | null
          total_revenue: number | null
          total_schools: number | null
          total_users: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_distance: {
        Args: { lat1: number; lat2: number; lng1: number; lng2: number }
        Returns: number
      }
      cleanup_expired_pending_admins: { Args: never; Returns: undefined }
      create_admin_after_payment: {
        Args: {
          p_admin_email: string
          p_admin_nom: string
          p_admin_password: string
          p_admin_prenom: string
          p_admin_telephone?: string
          p_ecole_id: string
        }
        Returns: Json
      }
      ensure_super_admin_exists: { Args: never; Returns: undefined }
      generate_school_code: { Args: never; Returns: string }
      get_current_user_ecole_id: { Args: never; Returns: string }
      get_my_school_stats: {
        Args: never
        Returns: {
          code_unique: string
          ecole_nom: string
          montant_total_paye: number
          nb_eleves: number
          nb_enseignants: number
          nb_recus_payes: number
          nb_recus_total: number
          nb_utilisateurs: number
          plan_subscription: string
        }[]
      }
      get_triggers_info: { Args: never; Returns: Json }
      get_user_ecole_id: { Args: { _user_id: string }; Returns: string }
      get_user_patient_id: { Args: { _user_id: string }; Returns: string }
      get_user_school_id: { Args: never; Returns: string }
      get_user_school_id_monecole1: { Args: never; Returns: string }
      get_user_type_monecole2: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_type"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_djassa: { Args: { user_id: string }; Returns: boolean }
      is_admin_user: { Args: never; Returns: boolean }
      is_current_user_super_admin: { Args: never; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
      is_super_admin_monecole1: { Args: never; Returns: boolean }
      migrate_existing_users: { Args: never; Returns: undefined }
      owns_professional_profile: {
        Args: { prof_id: string; user_id: string }
        Returns: boolean
      }
      recalc_rating_avg: { Args: { prof_id: string }; Returns: undefined }
      user_belongs_to_school: {
        Args: { _ecole_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "patient" | "medecin" | "admin"
      appointment_status: "pending" | "confirmed" | "cancelled" | "completed"
      bulletin_status: "brouillon" | "valide" | "publie"
      document_type:
        | "ordonnance"
        | "analyse"
        | "imagerie"
        | "compte_rendu"
        | "autre"
      emploi_temps_status: "brouillon" | "soumis" | "valide"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      permission_status: "en_attente" | "approuve" | "refuse"
      subscription_plan: "free" | "pro" | "premium"
      subscription_plan_type: "starter" | "professional" | "enterprise"
      subscription_status_type: "active" | "expired" | "cancelled"
      transaction_status: "pending" | "completed" | "failed" | "refunded"
      user_type:
        | "direction"
        | "econome"
        | "censeur"
        | "conseiller"
        | "educateur"
        | "secretariat"
        | "enseignant"
        | "eleve"
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
      app_role: ["patient", "medecin", "admin"],
      appointment_status: ["pending", "confirmed", "cancelled", "completed"],
      bulletin_status: ["brouillon", "valide", "publie"],
      document_type: [
        "ordonnance",
        "analyse",
        "imagerie",
        "compte_rendu",
        "autre",
      ],
      emploi_temps_status: ["brouillon", "soumis", "valide"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      permission_status: ["en_attente", "approuve", "refuse"],
      subscription_plan: ["free", "pro", "premium"],
      subscription_plan_type: ["starter", "professional", "enterprise"],
      subscription_status_type: ["active", "expired", "cancelled"],
      transaction_status: ["pending", "completed", "failed", "refunded"],
      user_type: [
        "direction",
        "econome",
        "censeur",
        "conseiller",
        "educateur",
        "secretariat",
        "enseignant",
        "eleve",
      ],
    },
  },
} as const
