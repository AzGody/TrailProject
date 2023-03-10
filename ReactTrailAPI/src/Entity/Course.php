<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use App\Repository\CourseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;


#[ApiResource(
    normalizationContext: ['groups' => ['course:read']],
    denormalizationContext: ['groups' => ['course:write']],
)]
#[Get]
#[Put(security: "is_granted('ROLE_USER')")]
#[GetCollection]
#[Post(security: "is_granted('ROLE_ORGANISATEUR')")]
#[Delete(security: "is_granted('ROLE_ORGANISATEUR')")]
#[ApiFilter(DateFilter::class, properties: ['date'])]
#[ApiFilter(RangeFilter::class, properties: ['distance'])]
#[ApiFilter(SearchFilter::class, properties: ['nom' => 'partial'])]
#[ORM\Entity(repositoryClass: CourseRepository::class)]
class Course
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['course:read', 'course:write', 'evenement:read', 'utilisateur:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['course:read', 'course:write', 'evenement:read', 'utilisateur:read'])]
    #[Assert\NotBlank]
    #[Assert\Type('string')]
    private ?string $nom = null;
    
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['course:read', 'course:write', 'evenement:read', 'utilisateur:read'])]
    #[Assert\NotBlank]
    private ?\DateTimeInterface $date = null;
    
    #[ORM\Column]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    #[Assert\Valid]
    private array $localisation = [];

    #[ORM\Column]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    #[Assert\Type('int')]
    private ?int $distance = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\Type('int')]
    private ?int $denivelePositif = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\Type('int')]
    private ?int $deniveleNegatif = null;

    #[ORM\ManyToOne(inversedBy: 'course')]
    #[Groups(['course:read', 'course:write'])]
    #[Assert\Valid]
    private ?Evenement $evenement = null;
    
    #[ORM\ManyToMany(targetEntity: Utilisateur::class, mappedBy: 'course')]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\NotBlank]
    #[Assert\Valid]
    private Collection $utilisateurs;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['course:read', 'course:write', 'evenement:read'])]
    #[Assert\Type('string')]
    #[Assert\Length(max: 2000)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Type('string')]
    #[Groups(['course:read', 'course:write'])]
    private ?string $image = null;

    public function __construct()
    {
        $this->utilisateurs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getLocalisation(): array
    {
        return $this->localisation;
    }

    public function setLocalisation(array $localisation): self
    {
        $this->localisation = $localisation;

        return $this;
    }

    public function getDistance(): ?int
    {
        return $this->distance;
    }

    public function setDistance(int $distance): self
    {
        $this->distance = $distance;

        return $this;
    }

    public function getDenivelePositif(): ?int
    {
        return $this->denivelePositif;
    }

    public function setDenivelePositif(?int $denivelePositif): self
    {
        $this->denivelePositif = $denivelePositif;

        return $this;
    }

    public function getDeniveleNegatif(): ?int
    {
        return $this->deniveleNegatif;
    }

    public function setDeniveleNegatif(?int $deniveleNegatif): self
    {
        $this->deniveleNegatif = $deniveleNegatif;

        return $this;
    }

    public function getEvenement(): ?Evenement
    {
        return $this->evenement;
    }

    public function setEvenement(?Evenement $evenement): self
    {
        $this->evenement = $evenement;

        return $this;
    }

    /**
     * @return Collection<int, Utilisateur>
     */
    public function getUtilisateurs(): Collection
    {
        return $this->utilisateurs;
    }

    public function addUtilisateur(Utilisateur $utilisateur): self
    {
        if (!$this->utilisateurs->contains($utilisateur)) {
            $this->utilisateurs->add($utilisateur);
            $utilisateur->addCourse($this);
        }

        return $this;
    }

    public function removeUtilisateur(Utilisateur $utilisateur): self
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            $utilisateur->removeCourse($this);
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }
}
